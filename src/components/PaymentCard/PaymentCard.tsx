import { useState } from 'react'
import './PaymentCard.css'

interface PaymentCardProps {
  /** Visual theme of the card */
  variant?: 'light' | 'dark' | 'skeleton' | 'sunset'
  /** Bank or brand name shown at the top */
  bankName?: string
  /** 16-digit card number, displayed in groups of 4 */
  cardNumber?: string
  /** Cardholder full name */
  cardholderName?: string
  /** Expiry date, e.g. "09/29" */
  expiry?: string
  /** CVV shown on the back */
  cvv?: string
  /** Card tier label, e.g. "infinite" */
  tier?: string
}

const VARIANTS = {
  light: {
    frontBg: 'linear-gradient(135deg, #ECEAFF 0%, #CBC4FF 100%)',
    backBg: 'linear-gradient(135deg, #DCD7FF, #B4AAF2)',
    text: 'var(--color-text-dark)',
    sub: 'rgba(38, 34, 78, 0.55)',
  },
  dark: {
    frontBg: 'linear-gradient(135deg, #2C2926 0%, #100F0D 100%)',
    backBg: 'linear-gradient(135deg, #211F1C, #0B0A09)',
    text: 'var(--color-text-light)',
    sub: 'rgba(242, 239, 233, 0.5)',
  },
  skeleton: {
    frontBg: '#ECE9E4',
    backBg: '#E3E0DA',
    text: 'transparent',
    sub: 'transparent',
  },
  sunset: {
    frontBg: 'linear-gradient(135deg, #FFB36B 0%, #E0526B 62%, #B23A83 100%)',
    backBg: 'linear-gradient(135deg, #D96A54, #8E2F63)',
    text: '#FFF7F0',
    sub: 'rgba(255, 247, 240, 0.62)',
  },
}

export const PaymentCard = ({
  variant = 'light',
  bankName = 'NOVA',
  cardNumber = '5312 4420 8871 0264',
  cardholderName = 'ANNA SOROKINA',
  expiry = '09/29',
  cvv = '314',
  tier = 'infinite',
}: PaymentCardProps) => {
  const [flipped, setFlipped] = useState(false)
  const styles = VARIANTS[variant]
  const isSkeleton = variant === 'skeleton'

  return (
    <div
      className="pc-scene"
      onClick={() => !isSkeleton && setFlipped(f => !f)}
      role={isSkeleton ? undefined : 'button'}
      aria-label={isSkeleton ? undefined : flipped ? 'Show card front' : 'Show card back'}
      tabIndex={isSkeleton ? undefined : 0}
      onKeyDown={e => {
        if (!isSkeleton && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          setFlipped(f => !f)
        }
      }}
    >
      <div
        className="pc-card"
        style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        <div
          className="pc-face pc-face--front"
          style={{ background: styles.frontBg, color: styles.text }}
          aria-hidden={flipped}
        >
          {isSkeleton ? (
            <div className="pc-skeleton-layer">
              <div className="pc-skeleton pc-skeleton--wide" />
              <div className="pc-skeleton pc-skeleton--chip" />
              <div className="pc-skeleton pc-skeleton--number" />
              <div className="pc-skeleton pc-skeleton--name" />
            </div>
          ) : (
            <>
              <div className="pc-front-header">
                <span className="pc-bank" style={{ color: styles.text }}>{bankName}</span>
                <span className="pc-tier" style={{ color: styles.sub }}>{tier.toUpperCase()}</span>
              </div>
              <div className="pc-chip" aria-hidden="true">
                <div className="pc-chip-inner" />
              </div>
              <div className="pc-number" style={{ color: styles.text }}>{cardNumber}</div>
              <div className="pc-front-footer">
                <div className="pc-holder-block">
                  <span className="pc-label" style={{ color: styles.sub }}>CARD HOLDER</span>
                  <span className="pc-value" style={{ color: styles.text }}>{cardholderName}</span>
                </div>
                <div className="pc-expiry-block">
                  <span className="pc-label" style={{ color: styles.sub }}>EXPIRES</span>
                  <span className="pc-value" style={{ color: styles.text }}>{expiry}</span>
                </div>
              </div>
            </>
          )}
        </div>

        <div
          className="pc-face pc-face--back"
          style={{ background: styles.backBg, color: styles.text }}
          aria-hidden={!flipped}
        >
          {isSkeleton ? (
            <div className="pc-skeleton-layer">
              <div className="pc-skeleton pc-skeleton--strip" />
              <div className="pc-skeleton pc-skeleton--cvv" />
            </div>
          ) : (
            <>
              <div className="pc-mag-strip" aria-hidden="true" />
              <div className="pc-cvv-row">
                <div className="pc-cvv-tape" aria-hidden="true" />
                <div className="pc-cvv-block">
                  <span className="pc-label" style={{ color: styles.sub }}>CVV</span>
                  <span className="pc-cvv-value" style={{ color: styles.text }}>{cvv}</span>
                </div>
              </div>
              <div className="pc-back-footer">
                <span className="pc-bank" style={{ color: styles.text }}>{bankName}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
