'use client';

import { login, resetPassword } from '@/app/actions';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { AuthCard } from './AuthCard';
import Link from 'next/link';

const initialState = {
  error: null,
};

function SubmitButton(props: { disabled?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={props.disabled || pending} aria-disabled={props.disabled || pending}>Sign In</Button>
  );
}

export function ResetPassForm() {
  const [state, formAction] = useFormState(resetPassword, initialState);
  const messageStatus = state.error ? 'error' : state.message ? 'success' : undefined;
  const message = state.error || state.message;
  return (
    <form action={formAction}>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <AuthCard title="Recover your account" message={message} messageStatus={messageStatus}>
          <div className="grid items-center gap-2">
            <Label htmlFor="email">Email</Label>
            <Input placeholder="Your email address" id="email" name="email" disabled={state.message} />
          </div>
          <SubmitButton disabled={state.message} />
          <div className="text-gray-500 text-center">
            Remember your credentials? <Link href="/auth/login" className="text-gray-600 hover:text-primary underline">Recover</Link>
          </div>
        </AuthCard>
      </div>
    </form>
  );
}