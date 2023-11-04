import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code') as string;
  const next = searchParams.get('next') ?? '/'
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);


  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(new URL(next, request.url));
    }
  }

  // return the user to an error page with some instructions
  return NextResponse.redirect(new URL('/auth/confirm/error', request.url));
}