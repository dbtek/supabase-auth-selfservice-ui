import { List } from '@/components/List';
import { ListItem } from '@/components/ListItem';
import { ListItemAvatar } from '@/components/ListItemAvatar';
import { ListItemText } from '@/components/ListItemText';
import { LogoutButton } from '@/components/LogoutButton';
import { PageTitle } from '@/components/PageTitle';
import { getServerClient } from '@/sb';
import { Mail, User } from 'lucide-react';
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
    <main className="mx-auto min-h-screen max-w-screen-xl">
      <div className="flex justify-between">
        <PageTitle primary="Profile" secondary="Manage your profile data" />
        <LogoutButton />
      </div>

      <List className="w-full max-w-md">
        <ListItem>
          <ListItemText primary="ID" secondary={data.user.id} />
          <User />
        </ListItem>
        <ListItem>
          <ListItemText primary="Email" secondary={data.user.email} />
          <Mail />
        </ListItem>
      </List>
    </main>
  )
}
