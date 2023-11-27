import { useQuery } from '@tanstack/react-query'
import { axios } from '@/lib/axios'

import { z } from 'zod'

const notesResponseSchema = z.array(
  z
    .object({
      id: z.number(),
      text: z.string(),
      createdAt: z.string(),
    })
    .optional()
)

const getNotes = async () => {
  const response = await axios.get('/notes')

  return notesResponseSchema.parse(response.data.data)
}

export const useNotes = () => {
  return useQuery({
    queryKey: ['notes'],
    queryFn: () => getNotes(),
  })
}
