import { useLoginUser } from '../api/login'
import { useQueryClient } from '@tanstack/react-query'

export const Login = () => {
  const queryClient = useQueryClient()

  const { mutate, data } = useLoginUser(queryClient)

  const form = {
    firstName: 'test',
    lastName: 'test',
    groupUnit: 2024,
    password: 'test',
  }

  console.log(data)

  return <button onClick={() => mutate(form)}>Login</button>
}
