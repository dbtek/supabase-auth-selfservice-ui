import { LoginForm } from '@/components/LoginForm';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Login(props: {
  searchParams: Record<string, string | undefined>
}) {
  const query = props.searchParams;
  const redirectTo = query.redirectTo || '/auth/profile';

  // test if user is already logged in
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });
  const { error, data } = await supabase.auth.getSession();
  const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

  // check if aal2 is required

  if (data && data.session) {
    const aal2 = query.aal === 'aal2' && aal && aal.nextLevel === 'aal2' && aal.nextLevel !== aal.currentLevel;
    if (aal2) {
      // redirect to aal2 login
      return redirect('/auth/login/aal2?redirectTo=' + encodeURIComponent(redirectTo));
    }
    return redirect(redirectTo);
  }
  
  return (
    <LoginForm redirectTo={redirectTo} aal={query.aal} />
  );
}