'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { instructions, openai } from '@/lib/openai';
import {
  CardWithId,
  deckResponseSchema,
  DeckWithoutIds,
  GeneratedDeckWithCards,
} from '@/lib/schemas/flashcards';
import prisma from '@/lib/prisma';
import { FlashcardType } from '@prisma/client';
import { APIResponse } from '@/lib/api-client';
import { deleteDeckDb, updateDeckDb } from '@/lib/db/decks';
import { revalidatePath } from 'next/cache';

/**
 * Generate a new deck of flashcards using OpenAI.
 * @param prompt The prompt to generate flashcards from.
 */
export async function generateDeck(
  prompt: string
): Promise<APIResponse<DeckWithoutIds>> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) return { ok: false, msg: 'Unauthorized', status: 401 };

  let output: string = '';
  try {
    const response = await openai.responses.create({
      model: 'gpt-4o-mini',
      instructions: instructions,
      input: prompt,
    });

    output = response.output_text;
  } catch (err) {
    console.log(err);
    return { ok: false, msg: 'Error: Failed to generate cards', status: 500 };
  }

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
  deck: DeckWithoutIds
): Promise<APIResponse<GeneratedDeckWithCards>> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) return { ok: false, msg: 'Unauthorized', status: 401 };

  try {
    const result = await prisma.deck.create({
      data: {
        name: deck.name,
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

export type UpdateDeckParams = {
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

  const result = await updateDeckDb(userId, deckId, updates);

  return result;
}

/**
 * Delete a deck.
 * @param deckId The ID of the deck to delete.
 */
export async function deleteDeck(deckId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { ok: false, msg: 'Unauthorized', status: 401 };
  }

  const userId = session.user.id;

  const result = await deleteDeckDb(userId, deckId);

  revalidatePath('/dashboard');

  return result;
}

/**
 * Save a deck study session.
 * @param deckId The ID of the deck.
 * @param totalTime The total time (ms) spent studying.
 */
export async function saveStudySession(deckId: string, totalTime: number) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { ok: false, msg: 'Unauthorized', status: 401 };
  }

  const userId = session.user.id;

  try {
    await prisma.studySession.create({
      data: {
        userId,
        deckId,
        totalTime,
      },
    });

    return { ok: true, msg: 'Study session saved' };
  } catch (err) {
    return { ok: false, msg: 'Failed to save study session', status: 500 };
  }
}
