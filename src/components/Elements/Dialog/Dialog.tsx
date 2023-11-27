import React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'

import clsx from 'clsx'

import styles from './Dialog.module.css'

export const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren
>(({ children, ...props }, forwardedRef) => {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={styles['dialog-overlay']} />
      <DialogPrimitive.Content
        className={clsx('alpha', styles['dialog-content'])}
        {...props}
        ref={forwardedRef}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
})

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
