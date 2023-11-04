import { PageTitle } from '@/components/PageTitle';
import { UpdatePasswordForm } from '@/components/PasswordUpdateForm';

export default function UpdatePassword() {

  return (
    <main>
      <PageTitle primary="Update Password" />
      <UpdatePasswordForm />
    </main>
  );
}