import { LogoutButton } from '@/components/LogoutButton';
import { getServerClient } from '@/sb';
import { redirect } from 'next/navigation';

export default async function Profile(props: {
  searchParams: Record<string, string | undefined>
}) {
  const supabase = getServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data || !data.user) {
    // user not logged in redirect him/her
    redirect('/auth/login');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-center text-gray-700">Hi, {data.user.email}</h1>
        <div className="border-b-2 border-gray-300 dark:border-gray-100 mt-4 mb-6 w-36 mx-auto" />
        <LogoutButton />
      </div>
    </main>
  )
}
