'use client';

import { setPassword } from '@/app/actions';
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
    <Button disabled={props.disabled} aria-disabled={props.disabled || pending}>Save</Button>
  );
}

export function UpdatePasswordForm(props: { redirectTo?: string }) {
  const [state, formAction] = useFormState(setPassword, initialState);

  return (
    <form action={formAction}>
      <div className="w-full max-w-md grid gap-6">
        {state.error && (
          <div className="text-destructive ring-1 ring-destructive rounded p-2 pl-5">
            {state.error}
          </div>
        )}
        {state.message && (
          <div className="text-primary ring-1 ring-primary rounded p-2 pl-5">
            {state.message}
          </div>
        )}
        <div className="grid items-center gap-3">
          <Label htmlFor="newPassword">New Password</Label>
          <Input placeholder="Your current password" type="password" id="newPassword" name="newPassword" />
        </div>
        <div className="grid items-center gap-3">
          <Label htmlFor="newPassword2">Repeat New Password</Label>
          <Input placeholder="Your current password" type="password" id="newPassword2" name="newPassword2" />
        </div>
        <SubmitButton disabled={state.message} />
      </div>
    </form>
  );
}