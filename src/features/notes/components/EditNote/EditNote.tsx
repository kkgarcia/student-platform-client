import { useEffect } from 'react'
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
  onSubmitSuccess: () => void
}

const editNoteSchema = z.object({
  text: z.string().min(1),
})

type EditNoteValues = z.infer<typeof editNoteSchema>

export const EditNoteForm = ({ note, onSubmitSuccess }: EditNoteFormProps) => {
  const editMutation = useUpdateNote()

  const onSubmitHandle: SubmitHandler<EditNoteValues> = ({ text }) => {
    console.log({ text, note })
    editMutation.mutate({ id: note.id, text })
  }

  useEffect(() => {
    if (editMutation.isSuccess) {
      onSubmitSuccess()
    }
  })

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
          onClick={() => onSubmitSuccess()}
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
