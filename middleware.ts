import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const password = process.env.APP_PASSWORD || 'mysecretpassword';
  const cookiePassword = req.cookies.get('appPassword')?.value; // Access the cookie value

  // Check if the user has already entered the correct password
  if (cookiePassword === password) {
    return NextResponse.next();
  }

  // Redirect to a password prompt page
  return NextResponse.redirect(new URL('/password-prompt', req.url));
}

// Apply middleware to all pages except the password prompt page
export const config = {
  matcher: '/((?!password-prompt).*)', // Exclude '/password-prompt'
};
