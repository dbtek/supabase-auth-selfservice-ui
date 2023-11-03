'use client';

import { logout } from '@/app/actions';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from './ui/button';

const initialState = {
  error: '',
};

function LogoutButtonBtn() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending}>Sign Out</Button>
  );
}

export function LogoutButton(props: { redirectTo?: string }) {
  const [state, formAction] = useFormState(logout, initialState);

  return (
    <form action={formAction}>
      <LogoutButtonBtn />
      {state.error && (
        <div className="mt-4 text-destructive ring-1 ring-destructive rounded p-2 pl-5">
          {state.error}
        </div>
      )}
    </form>
  );
}