'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog';

export function ConfirmDialog(props: {
  children: React.ReactNode;
  title: string;
  message: string;
  onConfirm: () => void;
  hiddenFields?: Record<string, string>;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{props.children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title}</AlertDialogTitle>
          <AlertDialogDescription>{props.message}</AlertDialogDescription>
        </AlertDialogHeader>
        <form action={props.onConfirm}>
          {props.hiddenFields &&
            Object.entries(props.hiddenFields).map(([key, value]) => (
              <input type="hidden" name={key} value={value} key={key} />
            ))}
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">OK</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
