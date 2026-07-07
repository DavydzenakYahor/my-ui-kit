import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { label: 'Primary', variant: 'primary' },
};

export const Danger: Story = {
  args: { label: 'Danger', variant: 'danger' },
};

export const Neutral: Story = {
  args: { label: 'Neutral', variant: 'neutral' },
};

export const Success: Story = {
  args: { label: 'Success', variant: 'success' },
};

export const Small: Story = {
  args: { label: 'Small', variant: 'primary', size: 'sm' },
};