import { auth } from '@/lib/auth';
import { getUserDecksDb } from '@/lib/db/decks';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session) {
    return NextResponse.json({ msg: 'Unauthorized' }, { status: 401 });
  }

  const params = req.nextUrl.searchParams;

  const page = parseInt(params.get('page') || '1', 10);
  const limit = parseInt(params.get('limit') || '8', 10);

  const result = await getUserDecksDb(session.user.id, { page, limit });

  if (!result.ok) {
    return NextResponse.json({ msg: result.msg }, { status: result.status });
  }

  return NextResponse.json(result.data);
}
