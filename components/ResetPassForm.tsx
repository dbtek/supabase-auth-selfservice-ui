'use client';

import { login, resetPassword } from '@/app/actions';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

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

  return (
    <form action={formAction}>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-96">
          <h1 className="text-xl font-semibold text-center text-gray-700">Password Reset</h1>
          <div className="border-b-2 border-gray-300 dark:border-gray-100 mt-4 mb-6 w-36 mx-auto" />
          <div className="bg-white p-4 rounded drop-shadow">
            <div className="grid gap-3 w-full max-w-sm">
              <div className="grid items-center gap-2">
                <Label htmlFor="email">Email</Label>
                <Input placeholder="Your email address" id="email" name="email" disabled={state.message} />
              </div>
              <SubmitButton disabled={state.message} />
            </div>
          </div>

          {state.error && (
            <div className="mt-4 text-destructive ring-1 ring-destructive rounded p-2 pl-5">
              {state.error}
            </div>
          )}

          {state.message && (
            <div className="mt-4 text-primary ring-1 ring-primary rounded p-2 pl-5">
              {state.message}
            </div>
          )}
        </div>
      </div>
    </form>
  );
}