import './Badge.css'

interface BadgeProps {
  /** Text label displayed inside the badge */
  label: string
  /** Visual style of the badge */
  variant?: 'primary' | 'danger' | 'neutral' | 'success'
  /** Size of the badge */
  size?: 'sm' | 'md'
}

export const Badge = ({
  label,
  variant = 'primary',
  size = 'md',
}: BadgeProps) => {
  return (
    <span className={`badge badge--${variant} badge--${size}`}>
      {label}
    </span>
  )
}
