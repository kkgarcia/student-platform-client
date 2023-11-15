import { type FieldError } from 'react-hook-form'

import styles from './FieldWrapper.module.css'

type FieldWrapperProps = {
  className?: string
  label: string
  error?: FieldError
  children: React.ReactNode
}

export type FieldWrapperPassThroughProps = Pick<FieldWrapperProps, 'label'>

export const FieldWrapper = ({ children, error, label }: FieldWrapperProps) => {
  return (
    <div className={styles['wrapper']}>
      <label className={styles['label']}>
        {label}
        <div>{children}</div>
      </label>
      {error?.message && (
        <span
          role="alert"
          aria-label={error.message}
          className={styles['error-message']}
        >
          {error.message}
        </span>
      )}
    </div>
  )
}
