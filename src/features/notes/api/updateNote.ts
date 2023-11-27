import { queryClient } from '@/lib/react-query'
import { axios } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'

import { z } from 'zod'

type UpdateNoteDTO = {
  id: number
  text: string
}

const updateNoteResponseSchema = z.object({
  id: z.number(),
  text: z.string(),
  createdAt: z.string(),
})

const updateNote = async ({ id, text }: UpdateNoteDTO) => {
  const response = await axios.put(`/note/${id}/update`, {
    text,
  })

  return updateNoteResponseSchema.parse(response.data.data)
}

type UseUpdateNoteProps = {
  onSuccess?: () => void
}

export const useUpdateNote = ({ onSuccess }: UseUpdateNoteProps) => {
  return useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      onSuccess && onSuccess()
    },
  })
}
