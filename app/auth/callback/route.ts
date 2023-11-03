import { getServerClient } from '@/sb';
import { EmailOtpType } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code') as string;
  const next = searchParams.get('next') ?? '/'
  const supabase = getServerClient();


  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(new URL(next, request.url));
    }
  }

  // return the user to an error page with some instructions
  return NextResponse.redirect(new URL('/auth/confirm/error', request.url));
}