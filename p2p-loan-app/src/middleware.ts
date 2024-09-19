import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Extract token and user from cookies
  const token = request.cookies.get('token')?.value;
  const userCookie = request.cookies.get('user')?.value;

  if (!token || !userCookie) {
    // Set headers to prevent caching
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate',
    );
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('Surrogate-Control', 'no-store');

    return response;
  }

  // Parse the user data from the cookie (since it's JSON stringified)
  try {
    const user = JSON.parse(userCookie);
  } catch (error) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate',
    );
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('Surrogate-Control', 'no-store');

    return response;
  }

  // Set cache control headers to prevent the dashboard from being cached
  const response = NextResponse.next();
  response.headers.set(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate',
  );
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  response.headers.set('Surrogate-Control', 'no-store');

  return response;
}

export const config = {
  matcher: ['/borrower/:path*', '/lender/:path*', '/create-offer', '/account-settings'],
};
