import { useDeleteNote } from '../../api/deleteNote'

import { Button } from '@/components/Elements/Button'

import styles from './DeleteNote.module.css'

type DeleteNoteProps = {
  noteId: number
  onSuccess: () => void
}

export const DeleteNote = ({ noteId, onSuccess }: DeleteNoteProps) => {
  const deleteNoteMutation = useDeleteNote({ onSuccess })

  return (
    <div className={styles['confirmation-dialog']}>
      <h3>Are you sure You want to delete this note?</h3>
      <Button
        variant="danger"
        type="button"
        onClick={() => deleteNoteMutation.mutate({ id: noteId })}
      >
        Delete
      </Button>

      <Button variant="accent" type="button" onClick={() => onSuccess()}>
        Cancel
      </Button>
    </div>
  )
}
