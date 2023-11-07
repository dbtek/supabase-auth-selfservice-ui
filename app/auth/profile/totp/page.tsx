import { TOTPEnrollForm } from '@/components/TOTPEnrollForm';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { List } from '@/components/List';
import { ListItem } from '@/components/ListItem';
import { ListItemText } from '@/components/ListItemText';
import { ListSubheader } from '@/components/ListSubheader';
import { PageTitle } from '@/components/PageTitle';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { createServerActionClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { FileWarning, ShieldBan, } from 'lucide-react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AuthMFAEnrollResponse } from '@supabase/supabase-js';

export default async function TOTP(props: {
  searchParams: Record<string, string>;
}) {
  const errors = [];
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  let enrollRes: AuthMFAEnrollResponse | null = null;

  const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (aal && aal.nextLevel === 'aal2' && aal.nextLevel !== aal.currentLevel) {
    redirect('/auth/login/aal2?redirectTo=/auth/profile/totp');
  }

  if (aal?.nextLevel === 'aal1') {
    enrollRes = await supabase.auth.mfa.enroll({
      factorType: 'totp',
    });
    if (enrollRes.error) errors.push(enrollRes.error.message);
  }

  const { data } = await supabase.auth.mfa.listFactors();
  const totpFactor = data?.totp[0];

  async function unenroll(fd: FormData) {
    'use server';
    const cookieStore = cookies();
    const supabase = createServerActionClient({
      cookies: () => cookieStore,
    });

    const { error } = await supabase.auth.mfa.unenroll({
      factorId: fd.get('factorId') as string,
    });

    if (error) {
      redirect('/auth/profile/totp?error=' + error.message);
    }
    redirect('/auth/profile/totp');
  }

  if (props.searchParams.error) {
    errors.push(props.searchParams.error);
  }

  return (
    <main>
      <PageTitle primary="Manage 2FA TOTP Authenticator App" />
      {errors.length > 0 && (
        <Alert variant="destructive" className="mb-4">
          <FileWarning />
          <div className="ml-2">
            {errors.map((error) => <div key={error}>{error}</div>)}
          </div>
        </Alert>
      )}

      {enrollRes?.data && <TOTPEnrollForm factorId={enrollRes?.data.id} qrCode={enrollRes?.data.totp.qr_code} />}
      
      {totpFactor && (
        <>
          <p className="text-gray-500">
            You have enabled TOTP factor. You can use your authenticator app to generate a verification code.
          </p>
          <ConfirmDialog
            title="Unenroll"
            message="TOTP will be removed from your account. Are you sure?"
            onConfirm={unenroll}
            hiddenFields={{ factorId: totpFactor.id }}
          >
            <Button
              type="button"
              variant="outline"
              className="mt-2"
            >
              <ShieldBan className="mr-2" />
              Unenroll
            </Button>
          </ConfirmDialog>
        </>
      )}
    </main>
  );
}