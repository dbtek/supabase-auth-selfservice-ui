type ListItemAvatarProps = {
  children: React.ReactNode;
};

export const ListItemAvatar = (props: ListItemAvatarProps) => {
  return <div className="flex-shrink-0">{props.children}</div>;
};
