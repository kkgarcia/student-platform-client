import axios from 'axios'
import { type SubmitHandler } from 'react-hook-form'

import { useUpdateNote } from '../../api/updateNote'

import { Form } from '@/components/Form/Form'
import { TextArea } from '@/components/Form/TextArea'
import { Button } from '@/components/Elements/Button'

import { z } from 'zod'

import styles from './EditNote.module.css'

type EditNoteFormProps = {
  note: {
    id: number
    text: string
    createdAt: string
  }
  onSuccess: () => void
}

const editNoteSchema = z.object({
  text: z.string().min(1),
})

type EditNoteValues = z.infer<typeof editNoteSchema>

export const EditNoteForm = ({ note, onSuccess }: EditNoteFormProps) => {
  const editMutation = useUpdateNote({ onSuccess })

  const onSubmitHandle: SubmitHandler<EditNoteValues> = ({ text }) => {
    editMutation.mutate({ id: note.id, text })
  }

  return (
    <div className={styles['edit-form-wrapper']}>
      <Form onSubmit={onSubmitHandle} schema={editNoteSchema}>
        <TextArea label="Edit Note" name="text" value={note.text} />

        <Button type="submit" isLoading={editMutation.isPending}>
          Edit
        </Button>

        <Button
          type="button"
          variant="accent"
          isLoading={editMutation.isPending}
          onClick={() => onSuccess()}
        >
          Cancel
        </Button>

        <span className={styles['server-error']}>
          {editMutation.isError && axios.isAxiosError(editMutation.error)
            ? editMutation.error.response?.data.message
            : null}
        </span>
      </Form>
    </div>
  )
}
