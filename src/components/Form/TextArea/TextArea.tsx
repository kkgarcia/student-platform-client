import { useController } from 'react-hook-form'

import {
  FieldWrapper,
  type FieldWrapperPassThroughProps,
} from '../FieldWrapper'

import clsx from 'clsx'

import styles from './TextArea.module.css'

type TextAreaProps = FieldWrapperPassThroughProps & {
  value?: string
  label: string
  name: string
  className?: string
  placeholder?: string
}

export const TextArea = ({
  value = '',
  name,
  label,
  className,
  placeholder,
}: TextAreaProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, defaultValue: value })

  return (
    <FieldWrapper label={label} error={error}>
      <textarea
        {...field}
        placeholder={placeholder}
        className={clsx(styles['textarea'], className)}
      />
    </FieldWrapper>
  )
}
