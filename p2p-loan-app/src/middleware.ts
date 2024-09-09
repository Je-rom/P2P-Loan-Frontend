import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  //extract token and user from cookies
  const token = request.cookies.get('token')?.value;
  const userCookie = request.cookies.get('user')?.value;

  if (!token || !userCookie) {
    //if no token or user is found, redirect to the login page
    return NextResponse.redirect(new URL('/login', request.url));
  }

  //parse the user data from the cookie (since it's JSON stringified)
  try {
    const user = JSON.parse(userCookie);
    // console.log('User:', user);
  } catch (error) {
    // console.error('Error parsing user cookie', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  //if everything checks out, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/borrower/:path*', '/lender/:path*', '/create-offer'],
};
