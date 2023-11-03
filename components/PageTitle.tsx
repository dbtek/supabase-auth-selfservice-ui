export const PageTitle = (props: { primary: string; secondary?: string }) => (
  <header className="mb-4">
    <h1 className="text-2xl font-semibold text-gray-900">{props.primary}</h1>
    {props.secondary && (
      <p className="mt-1 text-sm text-gray-500">{props.secondary}</p>
    )}
  </header>
);
