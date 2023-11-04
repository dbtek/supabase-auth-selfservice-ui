type ListItemTextProps = {
  primary: string;
  secondary?: string;
};

export const ListItemText = (props: ListItemTextProps) => {
  return (
    <div className="min-w-0 flex-1">
      <div className="focus:outline-none">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {props.primary}
        </p>
        {props.secondary && (
          <p className="truncate text-sm text-gray-500 dark:text-gray-200">
            {props.secondary}
          </p>
        )}
      </div>
    </div>
  );
};
