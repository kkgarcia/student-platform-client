import { useController } from 'react-hook-form'

import {
  FieldWrapper,
  type FieldWrapperPassThroughProps,
} from '../FieldWrapper/FieldWrapper'

import styles from './Input.module.css'
import clsx from 'clsx'

type InputProps = FieldWrapperPassThroughProps & {
  type?: string
  className?: string
  name: string
  placeholder?: string
}

export const Input = ({
  label,
  type = 'text',
  className,
  name,
  placeholder,
}: InputProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name })

  return (
    <FieldWrapper label={label} error={error}>
      <input
        type={type}
        className={clsx(styles['text-input'], className)}
        {...field}
        placeholder={placeholder}
      />
    </FieldWrapper>
  )
}
