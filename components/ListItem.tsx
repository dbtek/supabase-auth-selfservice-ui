import { clsx } from 'clsx';

type ListItemProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export const ListItem = (props: ListItemProps) => {
  return (
    <li
      className={clsx('bg-white dark:bg-slate-700', props.className)}
      onClick={props.onClick}
    >
      <div className="relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 hover:bg-gray-50 dark:hover:bg-slate-500">
        {props.children}
      </div>
    </li>
  );
};
