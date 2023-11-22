import { useState } from 'react'

import { useNotes } from '../../api/getNotes'

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/Elements/Dialog'
import { PlusIcon } from '@radix-ui/react-icons'
import { Note } from '../Note'
import { CreatNote } from '../CreateNote'

import styles from './Notes.module.css'

export const Notes = () => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const { data } = useNotes()

  const onSubmitSuccess = () => {
    setDialogOpen(false)
  }

  return (
    <div className={styles['notes-wrapper']}>
      <div className={styles['notes_head']}>
        <h3>Notes</h3>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <button className={styles['note_add-btn']}>
              <PlusIcon />
            </button>
          </DialogTrigger>
          <DialogContent>
            <CreatNote onSubmitSuccess={onSubmitSuccess} />
          </DialogContent>
        </Dialog>
      </div>

      <ul className={styles['notes-collection']}>
        {data?.map((note) => (
          <li key={note?.id}>{note && <Note note={note} />}</li>
        ))}
      </ul>
    </div>
  )
}
