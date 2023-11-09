import { useLoginUser } from '../api/login'

export const Login = () => {
  const { mutate, data } = useLoginUser()

  const form = {
    firstName: 'test',
    lastName: 'test',
    groupUnit: 2024,
    password: 'test',
  }

  console.log(data)

  return <button onClick={() => mutate(form)}>Login</button>
}
