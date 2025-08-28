import 'server-only';
import {
  CardWithId,
  DeckWithCards,
  DeckWithCardsAndMetrics,
  flashCardWithIdSchema,
} from '../schemas/flashcards';
import prisma from '../prisma';
import z from 'zod';
import { APIResponse } from '../api-client';

/**
 * Get a specific deck for a user.
 * @param userId The ID of the user.
 * @param deckId The ID of the deck.
 */
export async function getDeckDb(
  userId: string,
  deckId: string
): Promise<APIResponse<DeckWithCards>> {
  try {
    const result: DeckWithCards | null = await prisma.deck.findUnique({
      where: {
        id: deckId,
        userId,
      },
      include: {
        cards: {
          omit: {
            userId: true,
            deckId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!result) {
      return { ok: false, msg: 'Deck not found', status: 404 };
    }

    return { ok: true, data: result };
  } catch (err) {
    return { ok: false, msg: 'Internal Server Error', status: 500 };
  }
}

type GetUserDeckCountsResponse = {
  totalDecks: number;
  totalCards: number;
};

/**
 * Get the total count of decks and cards for a user.
 * @param userId The ID of the user.
 */
export async function getUserDeckCounts(
  userId: string
): Promise<APIResponse<GetUserDeckCountsResponse>> {
  try {
    const [totalDecks, totalCards] = await prisma.$transaction([
      prisma.deck.count({ where: { userId } }),
      prisma.flashcard.count({ where: { userId } }),
    ]);

    return {
      ok: true,
      data: {
        totalDecks,
        totalCards,
      },
    };
  } catch (err) {
    return { ok: false, msg: 'Internal Server Error', status: 500 };
  }
}

export type DeckSummary = {
  id: string;
  name: string;
  lastVisited: Date | undefined;
};

/**
 * Get summaries of decks for a user.
 * @param userId The ID of the user.
 */
export async function getUserDeckSummaries(
  userId: string
): Promise<APIResponse<DeckSummary[]>> {
  try {
    const result = await prisma.deck.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
      },
      take: 8,
    });

    const metrics = await prisma.deckMetrics.findMany({
      where: {
        userId,
        deckId: {
          in: result.map((d) => d.id),
        },
      },
      select: {
        deckId: true,
        lastVisited: true,
      },
    });

    const metricsMap = new Map(metrics.map((m) => [m.deckId, m.lastVisited]));

    const deckWithMetrics: DeckSummary[] = result.map((deck) => ({
      ...deck,
      lastVisited: metricsMap.get(deck.id),
    }));

    return { ok: true, data: deckWithMetrics };
  } catch (err) {
    return { ok: false, msg: 'Internal Server Error', status: 500 };
  }
}

/**
 * Get all decks for a user.
 * @param userId The ID of the user.
 */
export async function getUserDecksDb(
  userId: string
): Promise<APIResponse<DeckWithCardsAndMetrics[]>> {
  try {
    const result: DeckWithCards[] | null = await prisma.deck.findMany({
      where: {
        userId,
      },
      include: {
        cards: {
          omit: {
            userId: true,
            deckId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
      omit: {
        createdAt: true,
        updatedAt: true,
      },
      take: 8,
    });

    if (!result) {
      return { ok: false, msg: 'No decks found', status: 404 };
    }

    const metrics = await prisma.deckMetrics.findMany({
      where: {
        userId,
        deckId: {
          in: result.map((d) => d.id),
        },
      },
      select: {
        deckId: true,
        lastVisited: true,
      },
    });

    const metricsMap = new Map(metrics.map((m) => [m.deckId, m.lastVisited]));

    const deckWithMetrics: DeckWithCardsAndMetrics[] = result.map((deck) => ({
      ...deck,
      lastVisited: metricsMap.get(deck.id),
    }));

    return { ok: true, data: deckWithMetrics };
  } catch (err) {
    return { ok: false, msg: 'Internal Server Error', status: 500 };
  }
}

type UpdateDeckParams = {
  lastVisited?: Date;
  name?: string;
  cards?: CardWithId[];
};

/**
 * Update a deck.
 * @param userId The ID of the user who owns the deck.
 * @param deckId The ID of the deck to update.
 * @param updates The updates to apply to the deck.
 */
export async function updateDeckDb(
  userId: string,
  deckId: string,
  updates: UpdateDeckParams
): Promise<APIResponse<void>> {
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

    return { ok: true, data: undefined };
  } catch (err) {
    return { ok: false, msg: 'Failed to update deck', status: 500 };
  }
}

/**
 * Delete a deck.
 * @param userId The ID of the user who owns the deck.
 * @param deckId The ID of the deck to delete.
 */
export async function deleteDeckDb(
  userId: string,
  deckId: string
): Promise<APIResponse<void>> {
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

    await prisma.deck.delete({
      where: { id: deckId },
    });

    return { ok: true, data: undefined };
  } catch (err) {
    return { ok: false, msg: 'Failed to delete deck', status: 500 };
  }
}
