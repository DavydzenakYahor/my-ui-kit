import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'Email', placeholder: 'Enter your email' },
}

export const WithValue: Story = {
  args: { label: 'Email', value: 'email@example.com' },
}

export const WithError: Story = {
  args: { label: 'Email', placeholder: 'Enter your email', error: 'Invalid email address' },
}

export const Disabled: Story = {
  args: { label: 'Email', placeholder: 'Enter your email', disabled: true },
}