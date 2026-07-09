import { useState, useRef, type CSSProperties } from 'react'
import './AvatarHoverCard.css'

type Status = 'online' | 'away' | 'offline'
type Direction = 'top' | 'bottom' | 'left' | 'right'

interface AvatarHoverCardProps {
  /** UI color theme */
  theme?: 'light' | 'dark'
  /** Full name — initials are derived from this when the initials prop is absent */
  name?: string
  /** Job title or role shown in the hover card */
  role?: string
  /** Short bio shown in the hover card */
  bio?: string
  /** Avatar initials — derived from name automatically if omitted */
  initials?: string
  /** Background color of the avatar circle, e.g. "#5B5BD6" or "var(--color-indigo)" */
  avatarColor?: string
  /** User presence status */
  status?: Status
  /** Shows skeleton placeholders — use while profile data is loading */
  skeleton?: boolean
  /** Side where the hover card opens. When omitted the card opens on whichever side has the most space */
  direction?: Direction
  /** Called when the Message button is clicked */
  onMessage?: () => void
  /** Called when the Profile button is clicked */
  onProfile?: () => void
}

const STATUS_COLORS: Record<Status, string> = {
  online: '#22C55E',
  away: '#F59E0B',
  offline: '#9A958B',
}

const STATUS_LABELS: Record<Status, string> = {
  online: 'Online',
  away: 'Away',
  offline: 'Offline',
}

const POPUP_HEIGHT = 210
const POPUP_WIDTH = 260
const GAP = 12

const findScrollContainer = (element: HTMLElement): Element => {
  let parent = element.parentElement
  while (parent && parent !== document.body) {
    const { overflow, overflowX, overflowY } = window.getComputedStyle(parent)
    if (/auto|scroll/.test(overflow + overflowX + overflowY)) {
      return parent
    }
    parent = parent.parentElement
  }
  return document.documentElement
}

const getPopupStyle = (dir: Direction, visible: boolean): CSSProperties => {
  const shift = visible ? 0 : 8
  const base: CSSProperties = {
    opacity: visible ? 1 : 0,
    pointerEvents: visible ? 'auto' : 'none',
    transition: 'opacity 0.16s ease, transform 0.16s ease',
  }

  if (dir === 'bottom') {
    return {
      ...base,
      top: `calc(100% + ${GAP}px)`,
      left: '50%',
      transform: `translateX(-50%) translateY(${shift}px)`,
    }
  }
  if (dir === 'top') {
    return {
      ...base,
      bottom: `calc(100% + ${GAP}px)`,
      left: '50%',
      transform: `translateX(-50%) translateY(${-shift}px)`,
    }
  }
  if (dir === 'right') {
    return {
      ...base,
      left: `calc(100% + ${GAP}px)`,
      top: '50%',
      transform: `translateY(-50%) translateX(${shift}px)`,
    }
  }
  return {
    ...base,
    right: `calc(100% + ${GAP}px)`,
    top: '50%',
    transform: `translateY(-50%) translateX(${-shift}px)`,
  }
}

export const AvatarHoverCard = ({
  theme = 'light',
  name = 'Alex Johnson',
  role = 'Senior Engineer',
  bio = 'Building developer tools and internal platforms. Open source contributor.',
  initials,
  avatarColor = 'var(--color-indigo)',
  status = 'online',
  skeleton = false,
  direction,
  onMessage,
  onProfile,
}: AvatarHoverCardProps) => {
  const [visible, setVisible] = useState(false)
  const [resolvedDirection, setResolvedDirection] = useState<Direction>(direction || 'bottom')
  const triggerRef = useRef<HTMLButtonElement>(null)

  const displayInitials = initials || name
    .split(' ')
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase()

  const statusColor = STATUS_COLORS[status]

  const computeDirection = () => {
    if (direction) {
      setResolvedDirection(direction)
      return
    }
    const trigger = triggerRef.current
    if (!trigger) {
      setResolvedDirection('bottom')
      return
    }
    const rect = trigger.getBoundingClientRect()
    const container = findScrollContainer(trigger)
    const containerRect = container.getBoundingClientRect()
    const spaceBelow = containerRect.bottom - rect.bottom
    const spaceAbove = rect.top - containerRect.top
    const spaceRight = containerRect.right - rect.right
    const spaceLeft = rect.left - containerRect.left

    if (spaceBelow >= POPUP_HEIGHT + GAP) {
      setResolvedDirection('bottom')
    } else if (spaceAbove >= POPUP_HEIGHT + GAP) {
      setResolvedDirection('top')
    } else if (spaceRight >= POPUP_WIDTH + GAP) {
      setResolvedDirection('right')
    } else if (spaceLeft >= POPUP_WIDTH + GAP) {
      setResolvedDirection('left')
    } else {
      setResolvedDirection('top')
    }
  }

  const show = () => {
    computeDirection()
    setVisible(true)
  }

  const hide = () => setVisible(false)

  const handleBlur = (event: React.FocusEvent) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setVisible(false)
    }
  }

  return (
    <div
      className={`ahc-root ahc-root--${theme}`}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={handleBlur}
    >
      <button
        ref={triggerRef}
        type="button"
        className="ahc-trigger"
        tabIndex={skeleton ? -1 : undefined}
        aria-label={skeleton ? 'Loading' : `${name}, ${STATUS_LABELS[status]}`}
      >
        {skeleton ? (
          <div className="ahc-avatar ahc-avatar--skeleton" />
        ) : (
          <div className="ahc-avatar" style={{ background: avatarColor }}>
            {displayInitials}
          </div>
        )}
        {!skeleton && (
          <div
            className="ahc-status"
            style={{ background: statusColor }}
            aria-hidden="true"
          />
        )}
      </button>

      <div
        className="ahc-popup"
        style={getPopupStyle(resolvedDirection, visible)}
        role="tooltip"
        aria-hidden={!visible}
      >
        {skeleton ? (
          <div className="ahc-skeleton-section">
            <div className="ahc-skeleton-header">
              <div className="ahc-skeleton ahc-skeleton--avatar" />
              <div className="ahc-skeleton-text">
                <div className="ahc-skeleton ahc-skeleton--name" />
                <div className="ahc-skeleton ahc-skeleton--role" />
              </div>
            </div>
            <div className="ahc-skeleton ahc-skeleton--bio-1" />
            <div className="ahc-skeleton ahc-skeleton--bio-2" />
          </div>
        ) : (
          <>
            <div className="ahc-popup-header">
              <div
                className="ahc-mini-avatar"
                style={{ background: avatarColor }}
                aria-hidden="true"
              >
                {displayInitials}
              </div>
              <div className="ahc-popup-info">
                <span className="ahc-name">{name}</span>
                <span className="ahc-role">{role}</span>
              </div>
              <div className="ahc-status-badge" style={{ color: statusColor }}>
                <span className="ahc-status-dot-sm" style={{ background: statusColor }} />
                {STATUS_LABELS[status]}
              </div>
            </div>

            <p className="ahc-bio">{bio}</p>

            <div className="ahc-actions">
              <button
                type="button"
                className="ahc-btn ahc-btn--primary"
                onClick={() => { if (onMessage) { onMessage() } }}
              >
                Message
              </button>
              <button
                type="button"
                className="ahc-btn ahc-btn--secondary"
                onClick={() => { if (onProfile) { onProfile() } }}
              >
                Profile
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
