import { useState, useId } from 'react'
import './PaymentCard.css'

type Brand = 'visa' | 'mastercard' | 'amex'

interface PaymentCardProps {
  /** Payment network brand — determines the logo shown on the card */
  brand?: Brand
  /** Bank or issuer name shown at the top */
  bankName?: string
  /** 16-digit card number displayed in groups of 4 */
  cardNumber?: string
  /** Cardholder full name */
  cardholderName?: string
  /** Expiry date, e.g. "09/29" */
  expiry?: string
  /** CVV shown on the back */
  cvv?: string
  /** Replaces card content with a pulsing skeleton — use while card data is loading */
  skeleton?: boolean
}

const VisaLogo = () => (
  <svg width="54" height="18" viewBox="0 0 54 18" aria-label="Visa">
    <text
      x="0"
      y="15"
      fontFamily="Arial, sans-serif"
      fontSize="20"
      fontWeight="900"
      fontStyle="italic"
      fill="white"
    >
      VISA
    </text>
  </svg>
)

const MastercardLogo = () => {
  const clipId = useId()
  return (
    <svg width="40" height="26" viewBox="0 0 40 26" aria-label="Mastercard">
      <defs>
        <clipPath id={clipId}>
          <circle cx="26" cy="13" r="12" />
        </clipPath>
      </defs>
      <circle cx="14" cy="13" r="12" fill="#EB001B" />
      <circle cx="26" cy="13" r="12" fill="#F79E1B" />
      <circle cx="14" cy="13" r="12" fill="#FF5F00" clipPath={`url(#${clipId})`} />
    </svg>
  )
}

const AmexLogo = () => (
  <svg width="52" height="18" viewBox="0 0 52 18" aria-label="American Express">
    <text
      x="0"
      y="13"
      fontFamily="Arial, sans-serif"
      fontSize="11"
      fontWeight="700"
      fill="white"
      letterSpacing="2.5"
    >
      AMEX
    </text>
  </svg>
)

const BrandLogo = ({ brand }: { brand: Brand }) => {
  if (brand === 'visa') return <VisaLogo />
  if (brand === 'mastercard') return <MastercardLogo />
  return <AmexLogo />
}

export const PaymentCard = ({
  brand = 'visa',
  bankName = 'NOVA',
  cardNumber = '5312 4420 8871 0264',
  cardholderName = 'EXAMPLE NAME',
  expiry = '09/29',
  cvv = '314',
  skeleton = false,
}: PaymentCardProps) => {
  const [flipped, setFlipped] = useState(false)

  const toggle = () => {
    if (!skeleton) {
      setFlipped(previous => !previous)
    }
  }

  return (
    <div
      className="pc-scene"
      onClick={toggle}
      role={skeleton ? undefined : 'button'}
      aria-label={skeleton ? undefined : flipped ? 'Show card front' : 'Show card back'}
      tabIndex={skeleton ? undefined : 0}
      onKeyDown={event => {
        if (!skeleton && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault()
          toggle()
        }
      }}
    >
      <div
        className="pc-card"
        style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        <div
          className={`pc-face pc-face--front${skeleton ? ' pc-face--skeleton' : ''}`}
          aria-hidden={flipped}
        >
          {skeleton ? (
            <div className="pc-skeleton-layer">
              <div className="pc-skeleton pc-skeleton--wide" />
              <div className="pc-skeleton pc-skeleton--chip" />
              <div className="pc-skeleton pc-skeleton--number" />
              <div className="pc-skeleton pc-skeleton--name" />
            </div>
          ) : (
            <>
              <div className="pc-front-header">
                <span className="pc-bank">{bankName}</span>
                <BrandLogo brand={brand} />
              </div>
              <div className="pc-chip" aria-hidden="true">
                <div className="pc-chip-inner" />
              </div>
              <div className="pc-number">{cardNumber}</div>
              <div className="pc-front-footer">
                <div className="pc-holder-block">
                  <span className="pc-label">CARD HOLDER</span>
                  <span className="pc-value">{cardholderName}</span>
                </div>
                <div className="pc-expiry-block">
                  <span className="pc-label">EXPIRES</span>
                  <span className="pc-value">{expiry}</span>
                </div>
              </div>
            </>
          )}
        </div>

        <div
          className={`pc-face pc-face--back${skeleton ? ' pc-face--skeleton' : ''}`}
          aria-hidden={!flipped}
        >
          {skeleton ? (
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
                  <span className="pc-label">CVV</span>
                  <span className="pc-cvv-value">{cvv}</span>
                </div>
              </div>
              <div className="pc-back-footer">
                <span className="pc-bank">{bankName}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
