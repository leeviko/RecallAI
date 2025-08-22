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

export async function PUT(
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

  const body = await req.json();

  // UPDATES

  // lastVisited
  if (body.updateVisit) {
    try {
      const deck = await prisma.deck.findUnique({
        where: {
          id: deckId,
          userId: session.user.id,
        },
      });

      if (!deck) {
        return NextResponse.json({ msg: 'Deck not found' }, { status: 404 });
      }

      await prisma.deckMetrics.upsert({
        where: {
          deckId_userId: {
            userId: session.user.id,
            deckId: deckId,
          },
        },
        create: {
          userId: session.user.id,
          deckId: deckId,
        },
        update: {
          lastVisited: new Date(),
        },
      });
    } catch (err) {
      return NextResponse.json(
        { msg: 'Failed to update deck visit date' },
        { status: 500 }
      );
    }
  }

  // Name and cards

  if (!body.name && !body.cards) {
    return NextResponse.json({ msg: 'Nothing to update' }, { status: 400 });
  }

  try {
    await prisma.$transaction(async (ctx) => {
      if (body.name) {
        await ctx.deck.update({
          where: { id: deckId, userId: session.user.id },
          data: { name: body.name },
        });
      }

      if (body.cards) {
        const validatedCards = z
          .array(flashCardWithIdSchema)
          .safeParse(JSON.parse(body.cards));

        if (!validatedCards.success) {
          throw new Error('Invalid card data');
        }

        const cardUpdates = validatedCards.data.map((card) =>
          ctx.flashcard.update({
            where: { id: card.id, userId: session.user.id },
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

    return NextResponse.json({ msg: 'Deck updated successfully' });
  } catch (err) {
    return NextResponse.json({ msg: 'Failed to update deck' }, { status: 500 });
  }
}
