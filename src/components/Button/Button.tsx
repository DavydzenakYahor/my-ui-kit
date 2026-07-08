import './Button.css'

interface ButtonProps {
  /** Visual style of the button */
  variant?: 'primary' | 'danger' | 'neutral'
  /** Size of the button */
  size?: 'sm' | 'md'
  /** Disables interaction and applies muted style */
  disabled?: boolean
  /** Click handler */
  onClick?: () => void
  /** Content rendered inside the button */
  children: React.ReactNode
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  children,
}: ButtonProps) => {
  return (
    <button
      className={`btn btn--${variant} btn--${size}`}
      disabled={disabled}
      aria-disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
