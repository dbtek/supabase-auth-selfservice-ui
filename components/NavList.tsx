'use client';
import { ListSubheader } from '@/components/ListSubheader';
import { clsx } from 'clsx';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { UrlObject } from 'url';

export function NavItemComponent(props: {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
}) {
  return (
    <div
      className={clsx(
        props.active
          ? 'bg-gray-100 text-primary'
          : 'text-gray-600 hover:bg-gray-50 hover:text-primary',
        'group flex items-center rounded-md px-3 py-2 text-sm font-medium',
      )}
      aria-current="page"
    >
      {Boolean(props.icon) && props.icon}
      <span
        className={clsx('truncate', {
          'ml-3': Boolean(props.icon),
        })}
      >
        {props.label}
      </span>
    </div>
  );
}

export type NavItem = [
  string,
  {
    label: string;
    icon: ReactNode;
    href: string;
  }[],
];

type NavListProps = {
  items: NavItem[];
  linkComponent?: React.ComponentType<{ href: string | UrlObject }>;
};

export function NavList(props: NavListProps) {
  const pathname = usePathname();
  const LinkComponent = props.linkComponent || 'a';

  return (
    <nav className="overflow-y-auto" aria-label="Directory">
      <div className="space-y-4">
        {props.items.map(([title, items]) => (
          <div key={title}>
            <ListSubheader className="mb-1 ml-2">{title}</ListSubheader>
            {items.map((item) => {
              const isActive = pathname?.includes(item.href);
              return (
                <LinkComponent href={item.href} key={item.href}>
                  <NavItemComponent
                    label={item.label}
                    icon={item.icon}
                    active={isActive}
                  />
                </LinkComponent>
              );
            })}
          </div>
        ))}
      </div>
    </nav>
  );
}
