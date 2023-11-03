import { PageTitle } from '@/components/PageTitle';
import { UpdatePasswordForm } from '@/components/PasswordUpdateForm';
import { getServerClient } from '@/sb';

export default function UpdatePassword() {
  const supabase = getServerClient();

  return (
    <main>
      <PageTitle primary="Update Password" />
      <UpdatePasswordForm />
    </main>
  );
}