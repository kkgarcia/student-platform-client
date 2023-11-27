import axios from 'axios'
import { type SubmitHandler } from 'react-hook-form'

import { useLoginUser } from '@/features/auth/api/login'

import { Form } from '@/components/Form/Form'
import { Input } from '@/components/Form/Input'
import { Button } from '@/components/Elements/Button'
import { Link } from '@/components/Elements/Link'

import { z } from 'zod'

import styles from './LoginForm.module.css'

const loginSchema = z.object({
  firstName: z.string().min(1, { message: 'Required' }),
  lastName: z.string().min(1, { message: 'Required' }),
  password: z
    .string()
    .min(4, { message: 'Password must be at leat 4 characters' }),
  groupUnit: z.coerce.number().positive(),
})

type LoginValues = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const { mutate, isPending, isError, error } = useLoginUser()

  const onSubmit: SubmitHandler<LoginValues> = (formValues) => {
    mutate(formValues)
  }

  return (
    <Form onSubmit={onSubmit} schema={loginSchema}>
      <Input label="First Name:" name="firstName" />
      <Input label="Last Name:" name="lastName" />
      <Input label="Password:" name="password" type="password" />
      <Input label="Group Unit:" name="groupUnit" type="number" />

      <div className={styles['form_footer']}>
        <Button
          type="submit"
          className={styles['submit-btn']}
          isLoading={isPending}
        >
          Login
        </Button>

        <span className={styles['server-error']}>
          {isError && axios.isAxiosError(error)
            ? error.response?.data.message
            : null}
        </span>

        <Link className={styles['link']} to={'/register'}>
          Register
        </Link>
      </div>
    </Form>
  )
}
