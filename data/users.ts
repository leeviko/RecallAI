import 'server-only';

import { type NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { getSessionCookie } from 'better-auth/cookies';

export const verifySession = async (req: NextRequest) => {
  const sessionCookie = getSessionCookie(req);
  if (!sessionCookie) return false;

  return true;
};
