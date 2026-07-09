import type { Meta, StoryObj } from '@storybook/react-vite'
import { NotificationBell } from './NotificationBell'
import type { NotificationItem } from './NotificationBell'

const UNREAD_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    type: 'mention',
    title: 'Alex Johnson mentioned you',
    body: 'Hey, can you review my PR before EOD?',
    timestamp: '2m ago',
    read: false,
    initials: 'AJ',
    avatarColor: 'var(--color-indigo)',
  },
  {
    id: '2',
    type: 'success',
    title: 'Deployment to production succeeded',
    body: 'v2.4.1 is live — all 12 checks passed',
    timestamp: '1h ago',
    read: false,
  },
  {
    id: '3',
    type: 'info',
    title: 'Maria left a comment on issue #142',
    body: 'Looks good to me — a few minor notes',
    timestamp: '3h ago',
    read: true,
    initials: 'MS',
    avatarColor: '#B23A83',
  },
]

const ALL_READ_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    type: 'success',
    title: 'Sprint review completed',
    body: '8 of 10 tickets delivered this sprint',
    timestamp: 'Yesterday',
    read: true,
  },
  {
    id: '2',
    type: 'warning',
    title: 'Storage quota at 85%',
    body: 'Consider archiving old build artifacts',
    timestamp: 'Yesterday',
    read: true,
  },
  {
    id: '3',
    type: 'system',
    title: 'Scheduled maintenance complete',
    body: 'All systems back to normal',
    timestamp: '2d ago',
    read: true,
  },
]

const DARK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    type: 'mention',
    title: 'Jordan Lee tagged you in a thread',
    body: 'Left a comment on issue #89',
    timestamp: '5m ago',
    read: false,
    initials: 'JL',
    avatarColor: '#1d4ed8',
  },
  {
    id: '2',
    type: 'warning',
    title: 'API rate limit approaching',
    body: '80% of monthly quota used',
    timestamp: '30m ago',
    read: false,
  },
  {
    id: '3',
    type: 'system',
    title: 'Scheduled maintenance tonight',
    body: '02:00–04:00 UTC downtime expected',
    timestamp: '1h ago',
    read: true,
  },
]

const meta = {
  title: 'Components/NotificationBell',
  component: NotificationBell,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '60px 80px 300px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NotificationBell>

export default meta
type Story = StoryObj<typeof meta>

export const Unread: Story = {
  args: {
    theme: 'light',
    notifications: UNREAD_NOTIFICATIONS,
    defaultOpen: true,
  },
}

export const AllRead: Story = {
  args: {
    theme: 'light',
    notifications: ALL_READ_NOTIFICATIONS,
    defaultOpen: true,
  },
}

export const Dark: Story = {
  args: {
    theme: 'dark',
    notifications: DARK_NOTIFICATIONS,
    defaultOpen: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

export const Empty: Story = {
  args: {
    theme: 'light',
    notifications: [],
    defaultOpen: true,
  },
}

export const Skeleton: Story = {
  args: {
    skeleton: true,
    defaultOpen: true,
  },
}
