'use server';

import { getServerClient } from '@/sb';
const supabase = getServerClient();

export async function login(prevState: any, fd: FormData) {
  const email = fd.get('email') as string;
  const password = fd.get('password') as string;

  const r = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return r.error ? { error: r.error.message } : {};
}

export async function resetPassword(prevState: any, fd: FormData) {
  const email = fd.get('email') as string;

  const r = await supabase.auth.resetPasswordForEmail(email);

  return r.error ? { error: r.error.message } : { message: 'Check your email for a password reset link.' };
}