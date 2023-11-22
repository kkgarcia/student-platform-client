import { axios } from '@/lib/axios'
import { queryClient } from '@/lib/react-query'
import { useMutation } from '@tanstack/react-query'

import { z } from 'zod'

type CreateNoteDTO = {
  text: string
}

const createNoteResponseSchema = z.object({
  text: z.string(),
})

const createNote = async ({ text }: CreateNoteDTO) => {
  const response = await axios.post('/note/create', {
    text,
  })

  return createNoteResponseSchema.parse(response.data.data)
}

export const useCreateNote = () => {
  return useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })
}
