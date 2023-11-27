import axios from 'axios'
import { z } from 'zod'

import { type SubmitHandler } from 'react-hook-form'

import { Form } from '@/components/Form/Form'
import { Input } from '@/components/Form/Input'
import { Button } from '@/components/Elements/Button'
import { Link } from '@/components/Elements/Link'

import { useRegisterUser } from '@/features/auth/api/register'

import styles from './RegisterForm.module.css'

const registerSchema = z.object({
  firstName: z.string().min(1, { message: 'Required' }),
  lastName: z.string().min(1, { message: 'Required' }),
  password: z
    .string()
    .min(4, { message: 'Password must be at leat 4 characters' }),
  groupUnit: z.coerce.number().positive(),
})

type RegisterValues = z.infer<typeof registerSchema>

export const RegisterForm = () => {
  const { mutate, isPending, isError, error } = useRegisterUser()

  const onSubmit: SubmitHandler<RegisterValues> = (formValues) => {
    mutate(formValues)
  }

  return (
    <Form onSubmit={onSubmit} schema={registerSchema}>
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
          Register
        </Button>

        <span className={styles['server-error']}>
          {isError && axios.isAxiosError(error)
            ? error.response?.data.message
            : null}
        </span>

        <Link className={styles['link']} to={'/log-in'}>
          Log In
        </Link>
      </div>
    </Form>
  )
}
