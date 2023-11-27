import { axios } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

import storage from '@/utils/storage'

import { z } from 'zod'

const userResponseSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  groupUnit: z.number(),
  role: z.enum(['STUDENT', 'ADMIN']),
})

export type User = z.infer<typeof userResponseSchema>

const getUser = async () => {
  const token = storage.getToken() as string
  if (!token) return null

  const res = await axios.get('/auth/user')

  return userResponseSchema.parse(res.data.user)
}

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
  })
}
