import React from 'react'
import './Input.css'

interface InputProps {
  label?: string
  placeholder?: string
  value?: string
  disabled?: boolean
  error?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({
  label,
  placeholder,
  value,
  disabled = false,
  error,
  onChange,
}: InputProps) => {
  return (
    <div className="input-wrapper">
      {label && (
        <label className="input-label">
          {label}
        </label>
      )}
      <input
        className={`input ${error ? 'input--error' : ''}`}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        aria-disabled={disabled}
        aria-invalid={!!error}
        onChange={onChange}
      />
      {error && (
        <span className="input-error-message" role="alert">
          {error}
        </span>
      )}
    </div>
  )
}