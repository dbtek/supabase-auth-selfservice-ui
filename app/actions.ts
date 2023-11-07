'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

const _createClient = () => {
  const cookieStore = cookies();
  const supabase = createServerActionClient({
    cookies: () => cookieStore,
  });
  return supabase;
}

export async function login(prevState: any, fd: FormData) {
  const supabase = _createClient();
  const email = fd.get('email') as string;
  const password = fd.get('password') as string;
  const redirectTo = fd.get('redirectTo') as string;
  const aal = fd.get('aal') as string;

  const r = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (r.error) {
    return { error: r.error.message };
  }

  const { data: aalData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (aal === 'aal2' && aalData && aalData.nextLevel === 'aal2' && aalData.nextLevel !== aalData.currentLevel) {
    // redirect to aal2 login
    return redirect('/auth/login/aal2?redirectTo=' + encodeURIComponent(redirectTo));
  }

  redirect(redirectTo || '/auth/profile');
}

export async function logout() {
  const supabase = _createClient();

  const r = await supabase.auth.signOut();

  if (r.error) {
    return { error: r.error.message };
  }
  redirect('/auth/login');
}

export async function resetPassword(prevState: any, fd: FormData) {
  const supabase = _createClient();

  const email = fd.get('email') as string;
  const headerStore = headers();

  const redirectTo = new URL(headerStore.get('Origin') as string);
  redirectTo.pathname = '/auth/callback';
  redirectTo.searchParams.set('next', '/auth/update-password');

  const r = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectTo.toString(),
  });

  return r.error ? { error: r.error.message } : { message: 'Check your email for a password reset link.' };
}

export async function setPassword(prevState: any, fd: FormData) {
  const supabase = _createClient();

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

/**
 * Lower level MFA verification function
 */
async function _verifyMFA(fd: FormData) {
  const supabase = _createClient();

  const factorId = fd.get('factorId') as string;
  const verifyCode = fd.get('verifyCode') as string;

  const challenge = await supabase.auth.mfa.challenge({ factorId });
  if (challenge.error) {
    return { error: challenge.error };
  }
  const challengeId = challenge.data.id;

  return supabase.auth.mfa.verify({
    factorId,
    challengeId,
    code: verifyCode,
  });
}

export async function enrollMFA(prevState: any, fd: FormData) {
  const verify = await _verifyMFA(fd);

  if (verify.error) {
    return { error: verify.error.message };
  }

  return { message: 'MFA enrolled' };
}

export async function verifyMFA(prevState: any, fd: FormData) {
  const redirectTo = fd.get('redirectTo') as string;
  const verify = await _verifyMFA(fd);

  if (verify.error) {
    return { error: verify.error.message };
  }

  redirect(redirectTo);
}