import { useId } from 'react'
import './Input.css'

interface InputProps {
  /** Label text displayed above the input */
  label?: string
  /** Placeholder text inside the input */
  placeholder?: string
  /** Controlled value */
  value?: string
  /** Disables interaction and applies muted style */
  disabled?: boolean
  /** Error message shown below the input */
  error?: string
  /** Change handler */
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
  const inputId = useId()

  return (
    <div className="input-wrapper">
      {label && (
        <label className="input-label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`input ${error ? 'input--error' : ''}`}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        aria-disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        onChange={onChange}
      />
      {error && (
        <span id={`${inputId}-error`} className="input-error-message" role="alert">
          {error}
        </span>
      )}
    </div>
  )
}
