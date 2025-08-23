'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { instructions, openai } from '@/lib/openai';
import {
  DeckResponse,
  deckResponseSchema,
  GeneratedDeckWithCards,
} from '@/lib/schemas/flashcards';
import prisma from '@/lib/prisma';
import { FlashcardType } from '@prisma/client';
import { APIResponse } from '@/lib/api-client';

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

  const validatedOutput = deckResponseSchema.safeParse(JSON.parse(output));

  if (!validatedOutput.success) {
    console.error('Invalid output:', validatedOutput.error);
    console.log(output);
    return {
      ok: false,
      msg: 'Failed to generate valid flashcards',
      status: 500,
    };
  }

  console.log(validatedOutput.data);
  return {
    ok: true,
    data: validatedOutput.data,
  };
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
