import { auth } from '@/lib/auth';
import { getDeckDb } from '@/lib/db/decks';
import { NextRequest, NextResponse } from 'next/server';

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

  const deck = await getDeckDb(session.user.id, deckId);

  if (!deck.ok) {
    return NextResponse.json({ msg: deck.msg }, { status: deck.status });
  }

  return NextResponse.json(deck.data);
}
