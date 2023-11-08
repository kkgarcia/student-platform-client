import { axios } from '@/lib/axios'
import { useMutation, type QueryClient } from '@tanstack/react-query'

import storage from '@/utils/storage'

import { z } from 'zod'

type LoginCredentialsDTO = {
  firstName: string
  lastName: string
  groupUnit: number
  password: string
}

const loginResponseSchema = z.object({
  user: z.object({
    firstName: z.string(),
    lastName: z.string(),
    groupUnit: z.number(),
    role: z.string(),
  }),
  token: z.string(),
})

function handleUserResponse(data: z.infer<typeof loginResponseSchema>) {
  const { token, user } = data
  storage.setToken(token)
  return user
}

async function loginFn(data: LoginCredentialsDTO) {
  const res = await axios.post('/auth/log-in', data)

  return handleUserResponse(loginResponseSchema.parse(res.data))
}

export const useLoginUser = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (data: LoginCredentialsDTO) => loginFn(data),
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], () => data)
    },
  })
}
