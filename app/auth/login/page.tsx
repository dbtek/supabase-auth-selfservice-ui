import { LoginForm } from '@/components/LoginForm';
import { getServerClient } from '@/sb';
import { redirect } from 'next/navigation';

export default async function Login(props: {
  searchParams: Record<string, string | undefined>
}) {
  const query = props.searchParams;
  // test if user is already logged in
  const supabaseClient = getServerClient();
  const { error, data } = await supabaseClient.auth.getUser();

  if (data && data.user) {
    return redirect(query.redirectTo || '/auth/profile');
  }
  
  return (
    <LoginForm />
  );
}