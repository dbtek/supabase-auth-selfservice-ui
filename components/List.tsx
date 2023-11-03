import { clsx } from 'clsx';

type ListProps = {
  children: React.ReactNode;
  className?: string;
};

export const List = (props: ListProps) => {
  return (
    <nav
      className={clsx(
        `h-full overflow-y-auto rounded-md ring-2 ring-gray-100`,
        props.className,
      )}
      aria-label="Directory"
    >
      <div className="relative">
        <ul role="list" className="relative z-0 divide-y divide-gray-200">
          {props.children}
        </ul>
      </div>
    </nav>
  );
};
