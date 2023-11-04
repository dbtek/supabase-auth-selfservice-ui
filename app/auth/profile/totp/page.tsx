import { List } from '@/components/List';
import { ListItem } from '@/components/ListItem';
import { ListItemText } from '@/components/ListItemText';
import { ListSubheader } from '@/components/ListSubheader';
import { PageTitle } from '@/components/PageTitle';
import { TOTPForm } from '@/components/TOTPForm';
import { Button } from '@/components/ui/button';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Trash2 } from 'lucide-react';
import { cookies } from 'next/headers';

export default async function TOTP() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  const { error, data: enrollData } = await supabase.auth.mfa.enroll({
    factorType: 'totp',
  });

  const { data } = await supabase.auth.mfa.listFactors();
  console.log(enrollData);


  return (
    <main>
      <PageTitle primary="Manage 2FA TOTP Authenticator App" />
      {error && <div className="text-destructive py-2">{error.message}</div>}
      {enrollData && <TOTPForm factorId={enrollData.id} qrCode={enrollData.totp.qr_code} />}

      <ListSubheader className="mt-6 mb-2">
        Current Factors
      </ListSubheader>
      <List className="w-full max-w-md">
        {data && data.totp.map((totp) => (
          <ListItem key={totp.id}>
            <ListItemText primary={totp.factor_type} secondary={`${totp.status}`} />
            <Button className="bg-destructive p-0 rounded-full w-8 h-8">
              <Trash2 size={16} />
            </Button>
          </ListItem>
        ))}
      </List>
    </main>
  );
}