'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { instructions, openai } from '@/lib/openai';
import {
  CardWithId,
  DeckResponse,
  deckResponseSchema,
  flashCardWithIdSchema,
  GeneratedDeckWithCards,
} from '@/lib/schemas/flashcards';
import prisma from '@/lib/prisma';
import { Deck, FlashcardType } from '@prisma/client';
import { APIResponse } from '@/lib/api-client';
import z from 'zod';

/**
 * Generate a new deck of flashcards using OpenAI.
 * @param prompt The prompt to generate flashcards from.
 */
export async function generateDeck(
  prompt: string
): Promise<APIResponse<DeckResponse>> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) return { ok: false, msg: 'Unauthorized', status: 401 };

  const response = await openai.responses.create({
    model: 'gpt-4o-mini',
    instructions: instructions,
    input: prompt,
  });

  const output = response.output_text;

  try {
    const validatedOutput = deckResponseSchema.safeParse(JSON.parse(output));

    if (!validatedOutput.success) {
      return {
        ok: false,
        msg: 'Failed to generate valid cards',
        status: 500,
      };
    }

    return {
      ok: true,
      data: validatedOutput.data,
    };
  } catch (err) {
    if (typeof output === 'string') {
      return {
        ok: false,
        msg: output,
        status: 400,
      };
    }

    return {
      ok: false,
      msg: 'Failed to generate valid cards',
      status: 500,
    };
  }
}

/**
 * Add new deck to the database.
 * @param deck The deck to add.
 */
export async function addDeck(
  deck: DeckResponse
): Promise<APIResponse<GeneratedDeckWithCards>> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) return { ok: false, msg: 'Unauthorized', status: 401 };

  try {
    const result = await prisma.deck.create({
      data: {
        name: deck.title,
        cards: {
          create: deck.cards.map((card) => ({
            question: card.question,
            answer: card.answer,
            type: card.type as FlashcardType,
            userId: session.user.id,
            choices: card.choices ? card.choices : [],
          })),
        },
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
      include: {
        cards: true,
      },
    });

    if (!result) {
      console.log('Failed to create deck:', deck);
      return { ok: false, msg: 'Failed to add deck', status: 500 };
    }

    return { ok: true, data: result };
  } catch (err) {
    console.error('Error adding deck:', err);
    return { ok: false, msg: 'Failed to add deck', status: 500 };
  }
}

type UpdateDeckParams = {
  lastVisited?: Date;
  name?: string;
  cards?: CardWithId[];
};

/**
 * Update a deck.
 * @param deckId The ID of the deck to update.
 * @param updates The updates to apply to the deck.
 */
export async function updateDeck(deckId: string, updates: UpdateDeckParams) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { ok: false, msg: 'Unauthorized', status: 401 };
  }

  const userId = session.user.id;

  // UPDATES

  // lastVisited
  if (updates.lastVisited) {
    try {
      const deck = await prisma.deck.findUnique({
        where: {
          id: deckId,
          userId,
        },
      });

      if (!deck) {
        return { ok: false, msg: 'Deck not found', status: 404 };
      }

      await prisma.deckMetrics.upsert({
        where: {
          deckId_userId: {
            userId,
            deckId,
          },
        },
        create: {
          userId,
          deckId,
        },
        update: {
          lastVisited: new Date(),
        },
      });
    } catch (err) {
      return {
        ok: false,
        msg: 'Failed to update deck visit date',
        status: 500,
      };
    }
  }

  // Name and cards
  if (!updates.name && !updates.cards) {
    return { ok: false, msg: 'Nothing to update', status: 400 };
  }

  try {
    await prisma.$transaction(async (ctx) => {
      if (updates.name) {
        await ctx.deck.update({
          where: { id: deckId, userId },
          data: { name: updates.name },
        });
      }

      if (updates.cards) {
        const validatedCards = z
          .array(flashCardWithIdSchema)
          .safeParse(updates.cards);

        if (!validatedCards.success) {
          throw new Error('Invalid card data');
        }

        const cardUpdates = validatedCards.data.map((card: CardWithId) =>
          ctx.flashcard.update({
            where: { id: card.id, userId },
            data: {
              type: card.type,
              question: card.question,
              answer: card.answer,
              choices: card.choices,
            },
          })
        );

        await Promise.all(cardUpdates);
      }
    });

    return { ok: true, msg: 'Deck updated successfully' };
  } catch (err) {
    return { ok: false, msg: 'Failed to update deck', status: 500 };
  }
}
