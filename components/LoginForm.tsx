'use client';

import { login } from '@/app/actions';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

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
        <div className="w-96">
          <h1 className="text-xl font-semibold text-center text-gray-700">Sign In</h1>
          <div className="border-b-2 border-gray-300 dark:border-gray-100 mt-4 mb-6 w-36 mx-auto" />
          <div className="bg-white p-4 rounded drop-shadow">
            <div className="grid gap-3 w-full max-w-sm">
              <div className="grid items-center gap-2">
                <Label htmlFor="email">Email</Label>
                <Input placeholder="Your email address" id="email" name="email" />
              </div>
              <div className="grid items-center gap-2">
                <Label htmlFor="password">Password</Label>
                <Input placeholder="Your password" id="password" name="password" type="password" />
              </div>
              <SubmitButton />
            </div>
          </div>

          {state.error && (
            <div className="mt-4 text-red-500 ring-1 ring-red-500 rounded p-2 pl-5">
              {state.error}
            </div>
          )}
        </div>
      </div>
    </form>
  );
}