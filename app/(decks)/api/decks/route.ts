import { auth } from '@/lib/auth';
import { getUserDecksDb } from '@/lib/db/decks';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session) {
    return NextResponse.json({ msg: 'Unauthorized' }, { status: 401 });
  }

  const result = await getUserDecksDb(session.user.id);

  if (!result.ok) {
    return NextResponse.json({ msg: result.msg }, { status: result.status });
  }

  return NextResponse.json(result.data);
}
