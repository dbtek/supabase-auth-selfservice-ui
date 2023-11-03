import { PageTitle } from '@/components/PageTitle';
import { TOTPForm } from '@/components/TOTPForm';
import { getServerClient } from '@/sb';

export default async function TOTP() {
  const supabase = getServerClient();
  
  const { data, error } = await supabase.auth.mfa.enroll({
    factorType: 'totp',
  });

  return (
    <main>
      <PageTitle primary="Manage 2FA TOTP Authenticator App" />
      {data && <TOTPForm factorId={data.id} qrCode={data.totp.qr_code} />}
    </main>
  );
}