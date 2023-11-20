import { Link as RouterLink, LinkProps } from 'react-router-dom'
import clsx from 'clsx'

export const Link = ({ className, children, ...props }: LinkProps) => {
  return (
    <RouterLink className={clsx(className)} {...props}>
      {children}
    </RouterLink>
  )
}
