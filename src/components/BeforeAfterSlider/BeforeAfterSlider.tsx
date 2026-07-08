import { useState, useEffect, useRef, useCallback } from 'react'
import './BeforeAfterSlider.css'

interface BeforeAfterSliderProps {
  /** UI color theme for chrome elements */
  theme?: 'light' | 'dark'
  /** Replaces the scene with a shimmer skeleton */
  skeleton?: boolean
  /** Locks the divider in place — no dragging or keyboard movement */
  disabled?: boolean
  /** CSS gradient for both sides, e.g. "linear-gradient(...)" */
  gradient?: string
  /** Photo URL for both sides — wrapped automatically as url(...) center / cover */
  imageSrc?: string
  /** CSS filter applied to the "before" (unprocessed) side, e.g. "blur(6px) grayscale(0.6)" */
  beforeFilter?: string
  /** Badge label on the processed side, e.g. "GRADED" */
  badge?: string
  /** Filename label shown below the scene */
  filename?: string
  /** Initial divider position as a percentage 0–100 */
  defaultPosition?: number
}

export const BeforeAfterSlider = ({
  theme = 'light',
  skeleton = false,
  disabled = false,
  gradient,
  imageSrc,
  beforeFilter = 'grayscale(1)',
  badge,
  filename,
  defaultPosition = 50,
}: BeforeAfterSliderProps) => {
  const [position, setPosition] = useState(defaultPosition)
  const [dragging, setDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const backgroundValue = imageSrc
    ? `url(${imageSrc}) center / cover no-repeat`
    : gradient

  const calculatePosition = useCallback((clientX: number) => {
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const rawPercent = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, rawPercent)))
  }, [])

  useEffect(() => {
    if (!dragging) return

    const handlePointerMove = (event: PointerEvent) => {
      calculatePosition(event.clientX)
    }
    const handlePointerUp = () => {
      setDragging(false)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [dragging, calculatePosition])

  return (
    <div className={`bas-root bas-root--${theme}${disabled ? ' bas-root--disabled' : ''}`}>
      <div className="bas-scene" ref={containerRef}>
        {skeleton ? (
          <div className="bas-skeleton-fill" />
        ) : (
          <>
            <div
              className="bas-layer bas-layer--before"
              style={{ background: backgroundValue, filter: beforeFilter }}
            />
            <div
              className="bas-layer bas-layer--after"
              style={{
                background: backgroundValue,
                clipPath: `inset(0 ${100 - position}% 0 0)`,
              }}
            />

            <div
              className="bas-handle"
              style={{ left: `${position}%` }}
              role="slider"
              aria-label="Comparison position"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(position)}
              aria-disabled={disabled}
              tabIndex={disabled ? -1 : 0}
              onPointerDown={event => {
                if (disabled) return
                event.preventDefault()
                setDragging(true)
              }}
              onKeyDown={event => {
                if (disabled) return
                if (event.key === 'ArrowLeft') setPosition(previous => Math.max(0, previous - 2))
                if (event.key === 'ArrowRight') setPosition(previous => Math.min(100, previous + 2))
              }}
            >
              <div className="bas-handle-line" />
              <div className="bas-handle-knob">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <path
                    d="M9 6L5 11L9 16M13 6L17 11L13 16"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <span className="bas-side-label bas-side-label--before">BEFORE</span>
            <span className="bas-side-label bas-side-label--after">AFTER</span>

            {badge && <span className="bas-badge">{badge}</span>}
          </>
        )}
      </div>

      {(filename || skeleton) && (
        <div className="bas-footer">
          {skeleton ? (
            <div className="bas-skeleton bas-skeleton--filename" />
          ) : (
            <span className="bas-filename">{filename}</span>
          )}
        </div>
      )}
    </div>
  )
}
