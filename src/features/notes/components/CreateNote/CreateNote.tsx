import { type SubmitHandler } from 'react-hook-form'

import { useCreateNote } from '../../api/createNote'

import { Form } from '@/components/Form/Form'
import { TextArea } from '@/components/Form/TextArea'
import { Button } from '@/components/Elements/Button'

import { z } from 'zod'

import styles from './CreateNote.module.css'

const createNoteSchema = z.object({
  text: z.string().min(1),
})

type CreateNoteValues = z.infer<typeof createNoteSchema>

type CreateNoteProps = {
  onSuccess: () => void
}

export const CreatNote = ({ onSuccess }: CreateNoteProps) => {
  const createNoteMutation = useCreateNote({ onSuccess })

  const onSubmitHandle: SubmitHandler<CreateNoteValues> = (values) => {
    createNoteMutation.mutate(values)
  }

  return (
    <div className={styles['create-form-wrapper']}>
      <Form onSubmit={onSubmitHandle} schema={createNoteSchema}>
        <TextArea label="Create Note:" name="text" />
        <Button type="submit" isLoading={createNoteMutation.isPending}>
          Create
        </Button>

        <Button
          type="button"
          variant="accent"
          isLoading={createNoteMutation.isPending}
          onClick={() => onSuccess()}
        >
          Cancel
        </Button>
      </Form>
    </div>
  )
}
