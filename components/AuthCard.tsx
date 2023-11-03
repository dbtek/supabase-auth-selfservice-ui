import { cn } from '@/lib/utils'

export function AuthCard(props: {
  title: string,
  message?: string,
  messageStatus?: 'success' | 'error',
  children?: React.ReactNode
}) {
  return (
    <div className="w-full max-w-md">
      <h1 className="text-xl font-semibold text-center text-gray-700">{props.title}</h1>
      <div className="border-b-2 border-gray-300 dark:border-gray-100 my-8 w-36 mx-auto" />
      <div className="bg-white p-8 rounded drop-shadow">
        <div className="grid gap-6">
          {props.message && (
            <div className={cn('rounded p-2 ring-1', props.messageStatus == 'error' ? 'text-red-500 ring-red-500' : 'text-primary ring-primary')}>
              {props.message}
            </div>
          )}
          {props.children}
        </div>
      </div>
    </div>
  )
}