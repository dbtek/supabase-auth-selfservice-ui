export function ListSubheader(props: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={`text-sm font-medium text-gray-500 ${props.className}`}>
      {props.children}
    </h3>
  );
}
