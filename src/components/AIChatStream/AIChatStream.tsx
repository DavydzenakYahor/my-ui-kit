import { useState, useEffect } from 'react'
import './AIChatStream.css'

type Phase = 'thinking' | 'tool-running' | 'tool-done' | 'streaming' | 'complete'

interface AIChatStreamProps {
  /** UI color theme */
  theme?: 'light' | 'dark'
  /** Current phase of the AI response lifecycle — controlled by the parent */
  phase?: Phase
  /** Characters revealed per tick during streaming */
  streamSpeed?: number
  /** User question displayed in the chat bubble */
  question?: string
  /** Full AI answer text — streamed character by character when phase is "streaming" */
  answer?: string
  /** Tool name shown during tool-running and tool-done phases, e.g. "search_web · mdn.org" */
  toolName?: string
  /** Called when streaming completes — use to advance phase to "complete" */
  onComplete?: () => void
}

const TICK_MS = 30

const AIAvatar = () => (
  <div className="acs-avatar" aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="4" r="2.5" fill="currentColor" />
      <path d="M2 13c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  </div>
)

export const AIChatStream = ({
  theme = 'light',
  phase = 'thinking',
  streamSpeed = 3,
  question = 'What are CSS custom properties and how do they work?',
  answer = 'CSS custom properties — also called CSS variables — let you define reusable values once and reference them anywhere in your stylesheet. They cascade through the DOM just like regular properties, and can be overridden at any scope with a simple selector.',
  toolName = 'search_web · mdn.org',
  onComplete,
}: AIChatStreamProps) => {
  const [displayedText, setDisplayedText] = useState<string>(
    phase === 'complete' ? answer : ''
  )
  const [prevPhase, setPrevPhase] = useState<Phase>(phase)

  if (phase !== prevPhase) {
    setPrevPhase(phase)
    setDisplayedText(phase === 'complete' ? answer : '')
  }

  useEffect(() => {
    if (phase !== 'streaming') return

    let charIndex = 0
    const totalChars = answer.length

    const interval = setInterval(() => {
      charIndex = Math.min(charIndex + streamSpeed, totalChars)
      setDisplayedText(answer.slice(0, charIndex))

      if (charIndex >= totalChars) {
        clearInterval(interval)
        if (onComplete) {
          onComplete()
        }
      }
    }, TICK_MS)

    return () => clearInterval(interval)
  }, [phase, answer, streamSpeed, onComplete])

  const showText = phase === 'streaming' || phase === 'complete'
  const showCursor = phase === 'streaming'

  return (
    <div className={`acs-root acs-root--${theme}`} role="log" aria-live="polite">
      <div className="acs-question">
        <div className="acs-question-bubble">
          {question}
        </div>
      </div>

      <div className="acs-response">
        <AIAvatar />
        <div className="acs-body">
          {phase === 'thinking' && (
            <div className="acs-thinking" aria-label="Thinking">
              <span className="acs-dot" />
              <span className="acs-dot" />
              <span className="acs-dot" />
            </div>
          )}

          {(phase === 'tool-running' || phase === 'tool-done') && (
            <div className="acs-tool">
              {phase === 'tool-running' ? (
                <span className="acs-spinner" aria-hidden="true" />
              ) : (
                <svg
                  className="acs-tool-done"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2.5 7l3 3 6-6"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              <span className="acs-tool-name">{toolName}</span>
            </div>
          )}

          {showText && (
            <p className="acs-text">
              {displayedText}
              {showCursor && <span className="acs-cursor" aria-hidden="true" />}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
