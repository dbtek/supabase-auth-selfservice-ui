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
import { FileWarning, Trash2 } from 'lucide-react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function TOTP(props: {
  searchParams: Record<string, string>;
}) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  const { error, data: enrollData } = await supabase.auth.mfa.enroll({
    factorType: 'totp',
  });

  const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (aal && aal.nextLevel === 'aal2' && aal.nextLevel !== aal.currentLevel) {
    redirect('/auth/login/aal2?redirectTo=/auth/profile/totp');
  }

  const { data } = await supabase.auth.mfa.listFactors();

  const errors = [];
  if (error) errors.push(error.message);
  if (props.searchParams.error) errors.push(props.searchParams.error);

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

      {enrollData && <TOTPEnrollForm factorId={enrollData.id} qrCode={enrollData.totp.qr_code} />}

      <ListSubheader className="mt-6 mb-2">
        Active TOTP Factors
      </ListSubheader>
      <List className="w-full max-w-md">
        {data && data.totp.map((totp) => <TOTPListItem key={totp.id} {...totp} />)}
      </List>
    </main>
  );
}

function TOTPListItem(props: {
  id: string,
  factor_type: string,
  status: string,
}) {
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

  return (
    <ListItem key={props.id}>
      <ListItemText primary={props.factor_type} secondary={`${props.status}`} />
      <ConfirmDialog
        title="Unenroll"
        message="TOTP will be removed from your account. Are you sure?"
        onConfirm={unenroll}
        hiddenFields={{ factorId: props.id }}
      >
        <Button
          type="button"
          variant="ghost"
          className="text-destructive"
        >
          <Trash2 size={16} />
        </Button>
      </ConfirmDialog>
    </ListItem>
  );
}