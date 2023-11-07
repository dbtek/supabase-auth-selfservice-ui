import { PageTitle } from '@/components/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createServerActionClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Aal2(props: {
  searchParams: Record<string, string>;
}) {
  const redirectTo = props.searchParams.redirect_to || '/auth/profile';
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (aal && aal.currentLevel === 'aal2') {
    redirect(redirectTo);
  }

  async function handleSubmit(fd: FormData) {
    'use server'
    const cookieStore = cookies();
    const supabase = createServerActionClient({
      cookies: () => cookieStore,
    });

    const factors = await supabase.auth.mfa.listFactors();
    if (factors.error) {
      throw factors.error;
    }
    const totpFactor = factors.data.totp[0];
    if (!totpFactor) {
      throw new Error('No TOTP factors found!');
    }
    const factorId = totpFactor.id;

    const challenge = await supabase.auth.mfa.challenge({ factorId });
    if (challenge.error) {
      throw challenge.error;
    }

    const verify = await supabase.auth.mfa.verify({
      factorId: factorId,
      challengeId: challenge.data.id,
      code: fd.get('code') as string,
    });
    if (verify.error) {
      throw verify.error;
    }
    console.log(verify.data);

    const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
    console.log(aal);

    redirect(redirectTo);
  }

  return (
    <main>
      <PageTitle primary="Verify via Authenticator" />
      <form action={handleSubmit} className="w-full max-w-md">
        <div className="grid gap-6">
          <div className="grid items-center gap-3">
            <Label htmlFor="code">Code</Label>
            <Input placeholder="Authenticator code" id="code" name="code" />
          </div>
          <Button type="submit">Verify</Button>
        </div>
      </form>
    </main>
  );
}