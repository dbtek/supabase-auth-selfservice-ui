'use server';

import { getServerClient } from '@/sb';
import { headers } from 'next/headers';
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

  if (r.error) {
    return { error: r.error.message };
  }
  redirect(redirectTo || '/auth/profile');
}

export async function logout() {
  const r = await supabase.auth.signOut();

  if (r.error) {
    return { error: r.error.message };
  }
  redirect('/auth/login');
}

export async function resetPassword(prevState: any, fd: FormData) {
  const email = fd.get('email') as string;
  const headerStore = headers();
  console.log(headerStore.get('Origin'));
  const redirectTo = new URL(headerStore.get('Origin') as string);
  redirectTo.pathname = '/auth/callback';
  redirectTo.searchParams.set('next', '/auth/update-password');

  const r = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectTo.toString(),
  });

  return r.error ? { error: r.error.message } : { message: 'Check your email for a password reset link.' };
}

export async function setPassword(prevState: any, fd: FormData) {
  const newPassword = fd.get('newPassword') as string;
  const newPassword2 = fd.get('newPassword2') as string;
  
  if (newPassword !== newPassword2) {
    return { error: 'Passwords do not match' };
  }

  const r = await supabase.auth.updateUser({
    password: newPassword,
  });

  return r.error ? { error: r.error.message } : { message: 'Your password has been updated.' };
}