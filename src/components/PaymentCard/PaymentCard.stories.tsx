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

export const Light: Story = {
  args: {
    variant: 'light',
    bankName: 'NOVA',
    cardNumber: '5312 4420 8871 0264',
    cardholderName: 'EXAMPLE NAME',
    expiry: '09/29',
    cvv: '314',
    tier: 'infinite',
  },
}

export const Dark: Story = {
  args: {
    variant: 'dark',
    bankName: 'NOVA',
    cardNumber: '4916 0038 5512 7789',
    cardholderName: 'EXAMPLE NAME',
    expiry: '02/28',
    cvv: '882',
    tier: 'obsidian',
  },
}

export const Skeleton: Story = {
  args: {
    variant: 'skeleton',
  },
}

export const Sunset: Story = {
  args: {
    variant: 'sunset',
    bankName: 'NOVA',
    cardNumber: '5591 7712 0043 6620',
    cardholderName: 'EXAMPLE NAME',
    expiry: '11/27',
    cvv: '097',
    tier: 'sunset',
  },
}
