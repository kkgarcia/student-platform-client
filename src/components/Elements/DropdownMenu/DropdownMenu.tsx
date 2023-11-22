import React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

import styles from './DropdownMenu.module.css'

export const DropdownMenuContent = React.forwardRef<
  //   eslint-disable-next-line
  any,
  React.PropsWithChildren
>(({ children, ...props }, forwardedRef) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        className={styles['dropdown-content']}
        {...props}
        ref={forwardedRef}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  )
})

export const DropdownMenu = DropdownMenuPrimitive.Root
export const DropdownMenuItem = DropdownMenuPrimitive.Item
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
