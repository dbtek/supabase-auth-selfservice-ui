
import { Key, Lock, User2 } from 'lucide-react';
import { NavItem, NavList } from '@/components/NavList';
import Link from 'next/link';

const navItems: NavItem[] = [
  [
    'Data',
    [
      {
        icon: <User2 />,
        label: 'Profile',
        href: '/auth/profile',
      },
      {
        icon: <Key />,
        label: 'Update Password',
        href: '/auth/profile/update-password',
      },
    ],
  ],
];


export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <div className="px-2 pb-20 md:flex md:gap-4 md:px-4 md:pb-2">
        <div className="hidden w-64 min-w-max flex-col md:flex">
          <div className="mb-6 mt-2 px-2">
            <div className="rounded text-xl font-bold text-primary">Account</div>
          </div>
          <div className="flex-1">
            <NavList linkComponent={Link} items={navItems} exactMatch />
          </div>
        </div>
        <div className="min-h-screen rounded-md bg-white p-4 dark:bg-gray-900 md:flex-1">
          {children}
        </div>
      </div>
    </div>
  )
}
