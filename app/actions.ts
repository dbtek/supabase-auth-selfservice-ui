'use server';

import { getServerClient } from '@/sb';
import { redirect } from 'next/navigation';
const supabase = getServerClient();

export async function login(prevState: any, fd: FormData) {
  const email = fd.get('email') as string;
  const password = fd.get('password') as string;
  const redirectTo = fd.get('redirectTo') as string;

  const r = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return r.error ? { error: r.error.message } : {};
export async function logout() {
  const r = await supabase.auth.signOut();

  if (r.error) {
    return { error: r.error.message };
  }
  redirect('/auth/login');
}

export async function resetPassword(prevState: any, fd: FormData) {
  const email = fd.get('email') as string;

  const r = await supabase.auth.resetPasswordForEmail(email);

  return r.error ? { error: r.error.message } : { message: 'Check your email for a password reset link.' };
}