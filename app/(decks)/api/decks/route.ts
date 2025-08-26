import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import {
  DeckWithCards,
  DeckWithCardsAndMetrics,
} from '@/lib/schemas/flashcards';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session) {
    return NextResponse.json({ msg: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result: DeckWithCards[] | null = await prisma.deck.findMany({
      where: {
        userId: session.user.id,
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
      return NextResponse.json({ msg: 'No decks found' }, { status: 404 });
    }

    const metrics = await prisma.deckMetrics.findMany({
      where: {
        userId: session.user.id,
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

    return NextResponse.json(deckWithMetrics);
  } catch (err) {
    return NextResponse.json({ msg: 'Internal Server Error' }, { status: 500 });
  }
}
