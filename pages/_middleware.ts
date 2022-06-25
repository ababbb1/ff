import { getSession } from 'next-auth/react';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  if (req.nextUrl.pathname !== '/login') {
    const session = await getSession();
    if (!session) return NextResponse.redirect(`${origin}/login`);
  }
  return NextResponse.next();
}
