/* eslint-disable @next/next/no-img-element */
'use client';

import { enrollMfa } from '@/app/actions';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { Button } from './ui/button';
import Image from 'next/image';
import { Input } from './ui/input';
import { Label } from '@radix-ui/react-label';
import { cn } from '@/lib/utils';

export function TOTPForm(props: {
  factorId: string,
  qrCode: string,
}) {
  const [state, formAction] = useFormState(enrollMfa, { error: null });
  const message = state.error || state.message;

  return (
    <form action={formAction} className="w-full max-w-md grid gap-6">
      <input type="hidden" name="factorId" value={props.factorId} />
      {message && (
        <div className={cn('rounded p-2 ring-1', state.error ? 'text-red-500 ring-red-500' : 'text-primary ring-primary')}>
          {message}
        </div>
      )}
      <div className="grid items-center gap-2">
        <Label htmlFor="qrcode">Scan qr code with your authenticator app to add TOTP factor.</Label>
        <img src={props.qrCode} alt="QR Code" id="qrcode" />
      </div>
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
        Enable
      </Button>
    </form>
  )
}