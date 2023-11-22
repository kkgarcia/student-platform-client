import { axios } from '@/lib/axios'
import { queryClient } from '@/lib/react-query'
import { useMutation } from '@tanstack/react-query'

type DeleteNoteDTO = {
  id: number
}

const deleteNote = async ({ id }: DeleteNoteDTO) => {
  return axios.delete(`/note/${id}/delete`)
}

export const useDeleteNote = () => {
  return useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })
}
