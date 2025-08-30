import { getSessionCookie } from 'better-auth/cookies';
import { NextResponse, NextRequest } from 'next/server';

const protectedRoutes = ['/dashboard', '/create', '/deck'];
const authRoutes = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookie = getSessionCookie(request);
  const isAuthenticated = cookie !== null;

  const isAuthPage = authRoutes.includes(pathname);

  const isProtectedPage = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isAuthenticated && pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (isProtectedPage) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (isAuthPage) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // runtime: 'nodejs',
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
