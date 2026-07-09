import { useState, useEffect, useRef, useCallback, useId } from 'react'
import './NotificationBell.css'

type NotificationType = 'info' | 'success' | 'warning' | 'mention' | 'system'

export interface NotificationItem {
  /** Unique identifier */
  id: string
  /** Visual category that determines icon and accent colour */
  type?: NotificationType
  /** Primary notification text */
  title: string
  /** Optional supporting detail */
  body?: string
  /** Human-readable timestamp, e.g. "2m ago" or "Yesterday" */
  timestamp: string
  /** Whether the notification has been seen */
  read?: boolean
  /** Two-letter initials rendered inside the sender avatar */
  initials?: string
  /** Background colour of the sender avatar */
  avatarColor?: string
}

export interface NotificationBellProps {
  /** UI colour theme */
  theme?: 'light' | 'dark'
  /** Notifications to display in the panel */
  notifications?: NotificationItem[]
  /** Replaces content with shimmer placeholders while data loads */
  skeleton?: boolean
  /** Opens the panel on mount — for Storybook previews */
  defaultOpen?: boolean
  /** Called when the user clicks "Mark all read" */
  onMarkAllRead?: () => void
  /** Called when the user dismisses a single notification */
  onDismiss?: (id: string) => void
}

const TYPE_COLORS: Record<NotificationType, string> = {
  info: '#5B5BD6',
  success: '#15803d',
  warning: '#d97706',
  mention: '#E0526B',
  system: '#8a847e',
}

const TYPE_ICON_BG: Record<NotificationType, string> = {
  info: 'rgba(91, 91, 214, 0.12)',
  success: 'rgba(21, 128, 61, 0.12)',
  warning: 'rgba(217, 119, 6, 0.12)',
  mention: 'rgba(224, 82, 107, 0.12)',
  system: 'rgba(138, 132, 126, 0.12)',
}

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M10 2.5a6.5 6.5 0 00-6.5 6.5c0 3.8-1.5 5.5-1.5 5.5h16s-1.5-1.7-1.5-5.5A6.5 6.5 0 0010 2.5z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.73 17.5a2 2 0 01-3.46 0"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

const TypeIcon = ({ type }: { type: NotificationType }) => {
  const color = TYPE_COLORS[type]

  if (type === 'success') {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <circle cx="7" cy="7" r="6" stroke={color} strokeWidth="1.5" />
        <path d="M4 7l2 2 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (type === 'warning') {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M7 1.5l6 11H1l6-11z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M7 6v2.5M7 10.5v.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  }
  if (type === 'mention') {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <circle cx="7" cy="7" r="6" stroke={color} strokeWidth="1.5" />
        <circle cx="7" cy="7" r="2.2" stroke={color} strokeWidth="1.5" />
        <path d="M9.2 4.8V9" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  }
  if (type === 'system') {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <circle cx="7" cy="7" r="2" stroke={color} strokeWidth="1.5" />
        <path
          d="M7 1.5V3M7 11v1.5M1.5 7H3M11 7h1.5M3.2 3.2l1 1M9.8 9.8l1 1M3.2 10.8l1-1M9.8 4.2l1-1"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    )
  }
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="6" stroke={color} strokeWidth="1.5" />
      <path d="M7 6.5V10M7 4v.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export const NotificationBell = ({
  theme = 'light',
  notifications = [],
  skeleton = false,
  defaultOpen = false,
  onMarkAllRead,
  onDismiss,
}: NotificationBellProps) => {
  const [open, setOpen] = useState(defaultOpen)
  const rootRef = useRef<HTMLDivElement>(null)
  const bellRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()

  const unreadCount = notifications.filter(item => !item.read).length
  const hasUnread = unreadCount > 0

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const handleMouseDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        close()
      }
    }
    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [open, close])

  useEffect(() => {
    if (!open) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close()
        if (bellRef.current) {
          bellRef.current.focus()
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, close])

  const bellLabel = skeleton
    ? 'Loading'
    : hasUnread
    ? `Notifications, ${unreadCount} unread`
    : 'Notifications, no new messages'

  return (
    <div ref={rootRef} className={`nb-root nb-root--${theme}`}>
      <button
        ref={bellRef}
        type="button"
        className={`nb-btn${skeleton ? ' nb-btn--skeleton' : ''}`}
        aria-label={bellLabel}
        aria-expanded={skeleton ? undefined : open}
        aria-controls={skeleton ? undefined : panelId}
        tabIndex={skeleton ? -1 : undefined}
        onClick={skeleton ? undefined : () => setOpen(previous => !previous)}
      >
        {skeleton ? (
          <div className="nb-bell-shimmer" aria-hidden="true" />
        ) : (
          <>
            <BellIcon />
            {hasUnread && (
              <span className="nb-badge" aria-hidden="true">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </>
        )}
      </button>

      <div
        id={panelId}
        role="region"
        aria-label="Notifications"
        aria-hidden={open ? undefined : true}
        className="nb-panel"
        tabIndex={-1}
      >
        <div className="nb-panel-header">
          <span className="nb-panel-title">Notifications</span>
          {hasUnread && !skeleton && (
            <span className="nb-count-chip" aria-hidden="true">
              {unreadCount}
            </span>
          )}
          {hasUnread && !skeleton && (
            <button
              type="button"
              className="nb-mark-all"
              onClick={() => { if (onMarkAllRead) { onMarkAllRead() } }}
            >
              Mark all read
            </button>
          )}
        </div>

        {skeleton ? (
          <ul className="nb-list" role="list">
            {[0, 1, 2].map(index => (
              <li key={index} className="nb-item nb-item--skeleton">
                <div className="nb-shimmer nb-shimmer--icon" />
                <div className="nb-shimmer-content">
                  <div className="nb-shimmer nb-shimmer--title" />
                  <div className="nb-shimmer nb-shimmer--body" />
                </div>
                <div className="nb-shimmer nb-shimmer--time" />
              </li>
            ))}
          </ul>
        ) : notifications.length === 0 ? (
          <div className="nb-empty">
            <div className="nb-empty-icon" aria-hidden="true">
              <BellIcon />
            </div>
            <p className="nb-empty-title">You're all caught up</p>
            <p className="nb-empty-body">No new notifications right now</p>
          </div>
        ) : (
          <ul className="nb-list" role="list">
            {notifications.map(item => (
              <li
                key={item.id}
                className={`nb-item${item.read ? '' : ' nb-item--unread'}`}
              >
                {item.initials ? (
                  <div
                    className="nb-avatar"
                    style={{ background: item.avatarColor }}
                    aria-hidden="true"
                  >
                    {item.initials}
                  </div>
                ) : (
                  <div
                    className="nb-type-icon"
                    style={{ background: TYPE_ICON_BG[item.type || 'info'] }}
                  >
                    <TypeIcon type={item.type || 'info'} />
                  </div>
                )}

                <div className="nb-content">
                  <p className="nb-title">{item.title}</p>
                  {item.body && <p className="nb-body">{item.body}</p>}
                  <span className="nb-time">{item.timestamp}</span>
                </div>

                <div className="nb-actions">
                  {!item.read && <div className="nb-dot" aria-hidden="true" />}
                  <button
                    type="button"
                    className="nb-dismiss"
                    aria-label={`Dismiss: ${item.title}`}
                    onClick={() => { if (onDismiss) { onDismiss(item.id) } }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
