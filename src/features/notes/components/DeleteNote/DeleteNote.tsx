import { useEffect } from 'react'

import { useDeleteNote } from '../../api/deleteNote'

import { Button } from '@/components/Elements/Button'

import styles from './DeleteNote.module.css'

type DeleteNoteProps = {
  noteId: number
  onDeletionSuccess: () => void
}

export const DeleteNote = ({ noteId, onDeletionSuccess }: DeleteNoteProps) => {
  const deleteNoteMutation = useDeleteNote()

  useEffect(() => {
    if (deleteNoteMutation.isSuccess) {
      onDeletionSuccess()
    }
  })

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

      <Button
        variant="accent"
        type="button"
        onClick={() => onDeletionSuccess()}
      >
        Cancel
      </Button>
    </div>
  )
}
