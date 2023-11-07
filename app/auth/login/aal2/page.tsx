import { PageTitle } from '@/components/PageTitle';
import { TOTPVerifyForm } from '@/components/TOTPVerifyForm';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function LoginAAL2(props: {
  searchParams: Record<string, string>;
}) {
  const redirectTo = props.searchParams.redirectTo || '/auth/profile';
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (aal && aal.currentLevel === 'aal2') {
    redirect(redirectTo);
  }
  const factors = await supabase.auth.mfa.listFactors();
  if (factors.error) {
    throw factors.error;
  }

  // todo: add support for multiple 2nd factors 
  const totpFactor = factors.data.totp[0];
  if (!totpFactor) {
    throw new Error('No TOTP factors found!');
  }
  const factorId = totpFactor.id;

  return (
    <TOTPVerifyForm factorId={factorId} redirectTo={redirectTo}  />
  );
}