import { useState } from 'react'

import { formatDistanceToNow } from 'date-fns'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/Elements/DropdownMenu'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/Elements/Dialog'
import { EditNoteForm } from '../EditNote'
import { DeleteNote } from '../DeleteNote'

import clsx from 'clsx'

import styles from './Note.module.css'

type NoteProps = {
  note: {
    id: number
    text: string
    createdAt: string
  }
}

export const Note = ({ note }: NoteProps) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false)

  const date = formatDistanceToNow(new Date(note.createdAt))

  const onSuccess = () => {
    setDialogOpen(false)
    setDropdownMenuOpen(false)
  }

  return (
    <div className={styles['note']}>
      <div className={styles['note_head']}>
        <span className={styles['note_date']}>{date} ago</span>
        <div className={styles['note_dropdown']}>
          <DropdownMenu
            open={dropdownMenuOpen}
            onOpenChange={setDropdownMenuOpen}
          >
            <DropdownMenuTrigger asChild>
              <button className={styles['note_options-btn']}>
                <DotsHorizontalIcon />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <button
                      className={clsx(
                        styles['note_dropdown-btn'],
                        styles['note_edit-btn']
                      )}
                    >
                      Edit Note
                    </button>
                  </DialogTrigger>

                  <DialogContent>
                    <EditNoteForm note={note} onSubmitSuccess={onSuccess} />
                  </DialogContent>
                </Dialog>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      className={clsx(
                        styles['note_dropdown-btn'],
                        styles['note_delete-btn']
                      )}
                    >
                      Delete Note
                    </button>
                  </DialogTrigger>

                  <DialogContent>
                    <DeleteNote
                      noteId={note.id}
                      onDeletionSuccess={onSuccess}
                    />
                  </DialogContent>
                </Dialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <p className={styles['note_text']}>{note.text}</p>
    </div>
  )
}
