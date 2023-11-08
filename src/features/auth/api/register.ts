import { axios } from '@/lib/axios'
import { useMutation, type QueryClient } from '@tanstack/react-query'

import storage from '@/utils/storage'

import { z } from 'zod'

type RegisterUserDTO = {
  firstName: string
  lastName: string
  groupUnit: number
  password: string
}

const registerResponseSchema = z.object({
  user: z.object({
    firstName: z.string(),
    lastName: z.string(),
    groupUnit: z.number(),
    role: z.string(),
  }),
  token: z.string(),
})

function handleUserResponse(data: z.infer<typeof registerResponseSchema>) {
  const { token, user } = data
  storage.setToken(token)
  return user
}

async function RegisterFn(data: RegisterUserDTO) {
  const res = await axios.post('/auth/register', data)

  return handleUserResponse(registerResponseSchema.parse(res.data))
}

export const useRegisterUser = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (data: RegisterUserDTO) => RegisterFn(data),
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], () => data)
    },
  })
}
