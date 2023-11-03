import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function AuthError() {
  return (
    <main className="container pt-4">
      <Alert>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Sorry. Confirmation link is invalid or has expired.
        </AlertDescription>
      </Alert>
    </main>
  );
}