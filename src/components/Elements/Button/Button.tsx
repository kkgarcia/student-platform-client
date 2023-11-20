import clsx from 'clsx'
import styles from './Button.module.css'

const variants = {
  primary: styles['primary'],
  danger: styles['danger'],
}

const sizes = {
  sm: styles['small'],
  md: styles['medium'],
  lg: styles['large'],
}

type ButtonProps = {
  children: React.ReactNode
  type: 'button' | 'submit'
  isLoading?: boolean
  className?: string
  size?: keyof typeof sizes
  variant?: keyof typeof variants
  onClick?: () => void
}

export const Button = ({
  children,
  type = 'button',
  isLoading = false,
  size = 'md',
  variant = 'primary',
  className,
  onClick,
}: ButtonProps) => {
  return (
    <span>
      <button
        className={clsx(sizes[size], variants[variant], className)}
        type={type}
        disabled={isLoading}
        onClick={onClick}
      >
        {children}
      </button>
    </span>
  )
}
