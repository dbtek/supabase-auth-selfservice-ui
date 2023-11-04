import { List } from '@/components/List';
import { ListItem } from '@/components/ListItem';
import { ListItemText } from '@/components/ListItemText';
import { LogoutButton } from '@/components/LogoutButton';
import { PageTitle } from '@/components/PageTitle';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Mail, User } from 'lucide-react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Profile(props: {
  searchParams: Record<string, string | undefined>
}) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error || !session) {
    // user not logged in redirect him/her
    redirect('/auth/login');
  }

  return (
    <main>
      <div className="flex justify-between">
        <PageTitle primary="Profile" secondary="Manage your profile data" />
        <LogoutButton />
      </div>

      <List className="w-full max-w-md">
        <ListItem>
          <ListItemText primary="ID" secondary={session.user.id} />
          <User />
        </ListItem>
        <ListItem>
          <ListItemText primary="Email" secondary={session.user.email} />
          <Mail />
        </ListItem>
      </List>
    </main>
  )
}
