import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { DeckWithCards, flashCardWithIdSchema } from '@/lib/schemas/flashcards';
import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ deckId: string }> }
) {
  const { deckId } = await params;

  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session) {
    return NextResponse.json({ msg: 'Unauthorized' }, { status: 401 });
  }

  if (!deckId) {
    return NextResponse.json({ msg: 'Deck ID is required' }, { status: 400 });
  }

  try {
    const result: DeckWithCards | null = await prisma.deck.findUnique({
      where: {
        id: deckId,
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

    if (!result || result.userId !== session.user.id) {
      return NextResponse.json({ msg: 'Deck not found' }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ msg: 'Internal Server Error' }, { status: 500 });
  }
}
