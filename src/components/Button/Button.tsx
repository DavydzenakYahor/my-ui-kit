import React from 'react'
import './Button.css'

interface ButtonProps {
  variant?: 'primary' | 'danger' | 'neutral'
  size?: 'sm' | 'md'
  disabled?: boolean
  onClick?: () => void
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
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </button>
  )
}