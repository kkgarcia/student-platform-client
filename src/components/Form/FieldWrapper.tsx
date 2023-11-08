import { type FieldError } from 'react-hook-form'

type FieldWrapperProps = {
  className?: string
  label: string
  error?: FieldError
  children: React.ReactNode
}

export type FieldWrapperPassThroughProps = Pick<FieldWrapperProps, 'label'>

export const FieldWrapper = ({ children, error, label }: FieldWrapperProps) => {
  return (
    <div>
      <label>
        {label}
        <div>{children}</div>
      </label>
      {error?.message && (
        <div role="alert" aria-label={error.message}>
          {error.message}
        </div>
      )}
    </div>
  )
}
