import { LoginForm } from '@/components/LoginForm';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Login(props: {
  searchParams: Record<string, string | undefined>
}) {
  const query = props.searchParams;
  // test if user is already logged in
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });
  const { error, data } = await supabase.auth.getSession();

  if (data && data.session) {
    return redirect(query.redirectTo || '/auth/profile');
  }
  
  return (
    <LoginForm />
  );
}