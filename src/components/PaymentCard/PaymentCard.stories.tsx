import type { Meta, StoryObj } from '@storybook/react-vite'
import { PaymentCard } from './PaymentCard'

const meta = {
  title: 'Components/PaymentCard',
  component: PaymentCard,
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PaymentCard>

export default meta
type Story = StoryObj<typeof meta>

export const Visa: Story = {
  args: {
    brand: 'visa',
    bankName: 'NOVA',
    cardNumber: '4916 0038 5512 7789',
    cardholderName: 'CARDHOLDER NAME',
    expiry: '09/29',
    cvv: '314',
  },
}

export const Mastercard: Story = {
  args: {
    brand: 'mastercard',
    bankName: 'NOVA',
    cardNumber: '5312 4420 8871 0264',
    cardholderName: 'CARDHOLDER NAME',
    expiry: '02/28',
    cvv: '882',
  },
}

export const Amex: Story = {
  args: {
    brand: 'amex',
    bankName: 'NOVA',
    cardNumber: '3782 822463 10005',
    cardholderName: 'CARDHOLDER NAME',
    expiry: '11/27',
    cvv: '1234',
  },
}

export const Empty: Story = {
  args: {
    brand: 'visa',
    bankName: '',
    cardNumber: '**** **** **** ****',
    cardholderName: 'CARDHOLDER NAME',
    expiry: 'MM/YY',
    cvv: '***',
  },
}

export const Skeleton: Story = {
  args: {
    skeleton: true,
  },
}
