import {
  useForm,
  FormProvider,
  type SubmitHandler,
  type FieldValues,
  type UseFormProps,
} from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { type AnyZodObject } from 'zod'

export type FormProps<TFormValues extends FieldValues, Schema> = {
  className?: string
  children: React.ReactNode
  onSubmit: SubmitHandler<TFormValues>
  schema?: Schema
  options?: UseFormProps<TFormValues>
}

export const Form = <
  TFormValues extends FieldValues = FieldValues,
  Schema extends AnyZodObject = AnyZodObject
>({
  onSubmit,
  children,
  schema,
  options,
}: FormProps<TFormValues, Schema>) => {
  const methods = useForm<TFormValues>({
    ...options,
    resolver: schema && zodResolver(schema),
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  )
}
