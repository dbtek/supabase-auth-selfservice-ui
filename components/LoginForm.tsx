'use client';

import { login } from '@/app/actions';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import Link from 'next/link';
import { AuthCard } from './AuthCard';

const initialState = {
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button aria-disabled={pending}>Sign In</Button>
  );
}

export function LoginForm(props: { redirectTo?: string }) {
  const [state, formAction] = useFormState(login, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="redirectTo" value={props.redirectTo} />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <AuthCard title="Sign In" error={state.error}>
          <div className="grid items-center gap-3">
            <Label htmlFor="email">Email</Label>
            <Input placeholder="Your email address" id="email" name="email" />
          </div>
          <div className="grid items-center gap-3">
            <Label htmlFor="password">Password</Label>
            <Input placeholder="Your password" id="password" name="password" type="password" />
            <Link href="/auth/reset-password" className="text-sm text-gray-500 hover:underline hover:text-primary">
              Forgot your password?
            </Link>
          </div>
          <SubmitButton />
          <div className="text-gray-500 text-center">
            Don&apos;t have an account? <Link href="/auth/register" className="text-gray-600 hover:text-primary underline">Sign up</Link>
          </div>
        </AuthCard>
      </div>
    </form>
  );
}