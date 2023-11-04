import { LoginForm } from '@/components/LoginForm';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Login(props: {
  searchParams: Record<string, string | undefined>
}) {
  const query = props.searchParams;
  // test if user is already logged in
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { error, data } = await supabase.auth.getSession();

  if (data && data.session) {
    return redirect(query.redirectTo || '/auth/profile');
  }
  
  return (
    <LoginForm />
  );
}