import { NextRequest, NextResponse } from 'next/server';

const DEFAULT_LOCALE = 'id';
const SUPPORTED = new Set(['id', 'en']);

// Paths that should NOT be locale-prefixed
const BYPASS_PATHS = ['/admin-panel'];

export function middleware(request: NextRequest) {
 const { pathname } = request.nextUrl;

 if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
   return NextResponse.next();
 }

 // Bypass locale redirect for admin panel and other non-locale paths
 if (BYPASS_PATHS.some(p => pathname.startsWith(p))) {
   return NextResponse.next();
 }

 const segments = pathname.split('/').filter(Boolean);
 const locale = segments[0];

 if (!locale || !SUPPORTED.has(locale)) {
   const redirectURL = new URL(`/${DEFAULT_LOCALE}${pathname.startsWith('/') ? pathname : `/${pathname}`}`, request.url);
   return NextResponse.redirect(redirectURL);
 }

 return NextResponse.next();
}

export const config = {
 matcher: ['/((?!_next|api|.*\..*).*)'],
};
