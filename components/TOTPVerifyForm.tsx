/* eslint-disable @next/next/no-img-element */
'use client';

import { verifyMFA } from '@/app/actions';
import { cn } from '@/lib/utils';
import { Label } from '@radix-ui/react-label';
import { useFormState } from 'react-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { AuthCard } from './AuthCard';

export function TOTPVerifyForm(props: {
  factorId: string,
  redirectTo: string,
}) {
  const [state, formAction] = useFormState(verifyMFA, { error: null });
  const message = state.error || state.message;

  return (
    <form action={formAction}>
      <input type="hidden" name="factorId" value={props.factorId} />
      <input type="hidden" name="redirectTo" value={props.redirectTo} />
        <div className="flex flex-col items-center justify-center min-h-screen">
          <AuthCard title="2 Factor Authentication" message={state.error} messageStatus='error'>
            <div className="grid items-center gap-2">
              <Label htmlFor="verifyCode">Verification Code</Label>
              <Input
                type="text"
                id="verifyCode"
                name="verifyCode"
                placeholder="Enter the code from your authenticator app"
              />
            </div>
            <Button type="submit">
              Submit
            </Button>
          </AuthCard>
        </div>
    </form>
  )
}