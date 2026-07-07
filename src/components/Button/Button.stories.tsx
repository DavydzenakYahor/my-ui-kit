import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { variant: 'primary', children: 'Click me' },
}

export const Danger: Story = {
  args: { variant: 'danger', children: 'Delete' },
}

export const Neutral: Story = {
  args: { variant: 'neutral', children: 'Cancel' },
}

export const Disabled: Story = {
  args: { variant: 'primary', disabled: true, children: 'Disabled' },
}

export const Small: Story = {
  args: { variant: 'primary', size: 'sm', children: 'Small button' },
}