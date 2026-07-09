import type { Meta, StoryObj } from '@storybook/react-vite'
import { AvatarHoverCard } from './AvatarHoverCard'

const meta = {
  title: 'Components/AvatarHoverCard',
  component: AvatarHoverCard,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '80px 120px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AvatarHoverCard>

export default meta
type Story = StoryObj<typeof meta>

export const Online: Story = {
  args: {
    theme: 'light',
    name: 'Alex Johnson',
    role: 'Senior Engineer',
    bio: 'Building developer tools and internal platforms. Open source contributor.',
    avatarColor: 'var(--color-indigo)',
    status: 'online',
  },
}

export const Away: Story = {
  args: {
    theme: 'light',
    name: 'Maria Santos',
    role: 'Product Designer',
    bio: 'Designing systems that scale. Obsessed with motion and micro-interactions.',
    avatarColor: '#E0526B',
    status: 'away',
  },
}

export const Dark: Story = {
  args: {
    theme: 'dark',
    name: 'Jordan Lee',
    role: 'Data Engineer',
    bio: 'Pipelines, metrics, and dashboards. Making data actually useful.',
    avatarColor: 'var(--color-teal)',
    status: 'online',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

export const DirectionTop: Story = {
  name: 'Direction: Top',
  args: {
    theme: 'light',
    name: 'Sam Rivera',
    role: 'DevOps Engineer',
    bio: 'Kubernetes, CI/CD, and keeping things running at 3am.',
    avatarColor: '#B23A83',
    status: 'offline',
    direction: 'top',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '200px 120px 40px' }}>
        <Story />
      </div>
    ),
  ],
}

export const Skeleton: Story = {
  args: {
    skeleton: true,
  },
}
