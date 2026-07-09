# @davydzenak_yahor/my-ui-kit

Interactive React component library built with React 19, TypeScript, and Vite.

## Installation

```bash
npm install @davydzenak_yahor/my-ui-kit
```

Requires React 19 as a peer dependency.

## Setup

Import the stylesheet once at the root of your app:

```tsx
import '@davydzenak_yahor/my-ui-kit/styles'
```

If TypeScript complains about the CSS import, add this to a `declarations.d.ts` file:

```ts
declare module '@davydzenak_yahor/my-ui-kit/styles'
```

---

## Button

Action button with three visual variants and two sizes.

```tsx
import { Button } from '@davydzenak_yahor/my-ui-kit'

<Button onClick={() => console.log('clicked')}>
  Save changes
</Button>

<Button variant="danger" onClick={handleDelete}>
  Delete account
</Button>

<Button variant="neutral" size="sm" disabled>
  Unavailable
</Button>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'danger' \| 'neutral'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Disables interaction |
| `onClick` | `() => void` | — | Click handler |
| `children` | `ReactNode` | — | Button content |

---

## Input

Text input with label, error state, and accessible markup.

```tsx
import { useState } from 'react'
import { Input } from '@davydzenak_yahor/my-ui-kit'

const [email, setEmail] = useState('')
const [error, setError] = useState('')

const validate = () => {
  if (!email.includes('@')) {
    setError('Enter a valid email address')
  }
}

<Input
  label="Email"
  placeholder="you@example.com"
  value={email}
  onChange={event => setEmail(event.target.value)}
  error={error}
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Label above the input |
| `placeholder` | `string` | — | Placeholder text |
| `value` | `string` | — | Controlled value |
| `disabled` | `boolean` | `false` | Disables interaction |
| `error` | `string` | — | Error message shown below |
| `onChange` | `(event: ChangeEvent<HTMLInputElement>) => void` | — | Change handler |

---

## Badge

Compact status label with semantic color variants.

```tsx
import { Badge } from '@davydzenak_yahor/my-ui-kit'

<Badge label="Active" variant="success" />
<Badge label="Pending" variant="neutral" />
<Badge label="Failed" variant="danger" size="sm" />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Text inside the badge |
| `variant` | `'primary' \| 'danger' \| 'neutral' \| 'success'` | `'primary'` | Color variant |
| `size` | `'sm' \| 'md'` | `'md'` | Badge size |

---

## PaymentCard

3D flip card displaying payment card details. Click or press Enter/Space to reveal the CVV on the back.

```tsx
import { PaymentCard } from '@davydzenak_yahor/my-ui-kit'

// Showing a saved card
<PaymentCard
  brand="visa"
  bankName="NOVA"
  cardNumber="4916 0038 5512 7789"
  cardholderName="Example Name"
  expiry="09/29"
  cvv="314"
/>

// Empty preview while the user fills a form
<PaymentCard
  brand="mastercard"
  cardNumber="**** **** **** ****"
  cardholderName="CARDHOLDER NAME"
  expiry="MM/YY"
  cvv="***"
/>

// Loading state
<PaymentCard skeleton />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `brand` | `'visa' \| 'mastercard' \| 'amex'` | `'visa'` | Payment network logo |
| `bankName` | `string` | `'NOVA'` | Issuer name |
| `cardNumber` | `string` | — | Card number in groups of 4 |
| `cardholderName` | `string` | — | Cardholder full name |
| `expiry` | `string` | — | Expiry date, e.g. `"09/29"` |
| `cvv` | `string` | — | CVV shown on the back |
| `skeleton` | `boolean` | `false` | Loading state, disables flip |

---

## BeforeAfterSlider

Drag-to-compare slider. The left side shows the "before" version with an optional CSS filter applied; the right side shows the "after" version.

```tsx
import { BeforeAfterSlider } from '@davydzenak_yahor/my-ui-kit'

// Photo before/after — e.g. AI upscaling
<BeforeAfterSlider
  imageSrc="https://example.com/photo.jpg"
  beforeFilter="blur(6px) grayscale(0.6)"
  badge="UPSCALED"
  filename="portrait.jpg"
  defaultPosition={35}
/>

// Gradient before/after — e.g. color grading
<BeforeAfterSlider
  gradient="linear-gradient(135deg, #FFB36B 0%, #E0526B 62%, #B23A83 100%)"
  beforeFilter="grayscale(1)"
  badge="GRADED"
  filename="sunset_001.raw"
/>

// Dark theme
<BeforeAfterSlider
  imageSrc="https://example.com/photo.jpg"
  beforeFilter="grayscale(1)"
  theme="dark"
/>

// Disabled — divider locked in place
<BeforeAfterSlider
  gradient="linear-gradient(135deg, #FFB36B, #B23A83)"
  beforeFilter="grayscale(1)"
  disabled
/>

// Loading state
<BeforeAfterSlider skeleton />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `theme` | `'light' \| 'dark'` | `'light'` | UI color theme |
| `imageSrc` | `string` | — | Photo URL, applied as `cover` background on both sides |
| `gradient` | `string` | — | CSS gradient for both sides, e.g. `"linear-gradient(...)"` |
| `beforeFilter` | `string` | `'grayscale(1)'` | CSS filter on the before (left) side |
| `badge` | `string` | — | Label on the after side, e.g. `"GRADED"` |
| `filename` | `string` | — | Filename shown below the scene |
| `defaultPosition` | `number` | `50` | Initial divider position (0–100) |
| `disabled` | `boolean` | `false` | Locks the divider, no dragging |
| `skeleton` | `boolean` | `false` | Loading state |

---

## UploadDropzone

Multi-file drag & drop zone with sequential upload simulation and progress bars.

```tsx
import { UploadDropzone } from '@davydzenak_yahor/my-ui-kit'

// Basic — user drags or clicks to pick files
<UploadDropzone
  accept=".pdf,image/*"
  onUpload={files => console.log('Uploaded:', files)}
/>

// Restrict to single file
<UploadDropzone multiple={false} accept=".pdf" />

// Dark theme
<UploadDropzone theme="dark" />

// Pre-populate with files and start simulation immediately
<UploadDropzone
  initialFiles={[file1, file2]}
  uploadSeconds={4}
  onUpload={files => sendToServer(files)}
/>
```

`onUpload` is called with the full list of `File` objects once all uploads complete.

| Prop | Type | Default | Description |
|---|---|---|---|
| `theme` | `'light' \| 'dark'` | `'light'` | UI color theme |
| `accept` | `string` | — | Forwarded to `<input accept>`, e.g. `".pdf,image/*"` |
| `multiple` | `boolean` | `true` | Allow selecting multiple files |
| `initialFiles` | `File[]` | — | Pre-populate and start simulation on mount |
| `uploadSeconds` | `number` | `3` | Simulated upload duration per file in seconds |
| `onUpload` | `(files: File[]) => void` | — | Called when all uploads complete |

---

## AIChatStream

Streaming AI chat UI. The parent controls the current phase and advances it via `onComplete`.

```tsx
import { useState } from 'react'
import { AIChatStream } from '@davydzenak_yahor/my-ui-kit'

type Phase = 'thinking' | 'tool-running' | 'tool-done' | 'streaming' | 'complete'

const [phase, setPhase] = useState<Phase>('thinking')

// Advance through phases in your app logic:
// 'thinking' → 'tool-running' → 'tool-done' → 'streaming' → 'complete'

<AIChatStream
  phase={phase}
  question="What are CSS custom properties?"
  answer="CSS custom properties let you define reusable values and reference them anywhere in your stylesheet."
  toolName="search_web · mdn.org"
  streamSpeed={3}
  onComplete={() => setPhase('complete')}
/>
```

`onComplete` fires when the streaming animation finishes. Use it to advance `phase` to `'complete'`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `theme` | `'light' \| 'dark'` | `'light'` | UI color theme |
| `phase` | `'thinking' \| 'tool-running' \| 'tool-done' \| 'streaming' \| 'complete'` | `'thinking'` | Current lifecycle phase |
| `question` | `string` | — | User question shown in the chat bubble |
| `answer` | `string` | — | Full AI answer, streamed character by character |
| `toolName` | `string` | — | Tool label during `tool-running` / `tool-done`, e.g. `"search_web · mdn.org"` |
| `streamSpeed` | `number` | `3` | Characters revealed per tick |
| `onComplete` | `() => void` | — | Called when streaming finishes |

---

## AvatarHoverCard

Avatar that reveals a hover card with the user's name, role, bio, status, and action buttons. Works with mouse and keyboard (focus).

```tsx
import { AvatarHoverCard } from '@davydzenak_yahor/my-ui-kit'

// Basic usage
<AvatarHoverCard
  name="Alex Johnson"
  role="Senior Engineer"
  bio="Building developer tools and internal platforms."
  status="online"
  onMessage={() => openChat('alex')}
  onProfile={() => navigate('/users/alex')}
/>

// Custom avatar color and away status
<AvatarHoverCard
  name="Maria Santos"
  role="Product Designer"
  bio="Designing systems that scale."
  avatarColor="#E0526B"
  status="away"
/>

// Dark theme
<AvatarHoverCard
  theme="dark"
  name="Jordan Lee"
  role="Data Engineer"
  avatarColor="var(--color-teal)"
  status="online"
/>

// Loading state
<AvatarHoverCard skeleton />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `theme` | `'light' \| 'dark'` | `'light'` | UI color theme |
| `name` | `string` | `'Alex Johnson'` | Full name — used to derive initials |
| `role` | `string` | — | Job title shown in the hover card |
| `bio` | `string` | — | Short bio shown in the hover card |
| `initials` | `string` | — | Avatar initials — derived from name if omitted |
| `avatarColor` | `string` | `'var(--color-indigo)'` | Avatar background color |
| `status` | `'online' \| 'away' \| 'offline'` | `'online'` | User presence status |
| `skeleton` | `boolean` | `false` | Loading state with shimmer placeholders |
| `direction` | `'top' \| 'bottom' \| 'left' \| 'right'` | — | Fixed side for the hover card. When omitted, the component auto-detects which side has the most space |
| `onMessage` | `() => void` | — | Called when Message is clicked |
| `onProfile` | `() => void` | — | Called when Profile is clicked |

---

## NotificationBell

Bell icon button that opens a dropdown panel listing notifications. Supports unread badges, sender avatars, per-type icons (info / success / warning / mention / system), "Mark all read", per-item dismiss, an empty state, and a skeleton loading mode. Closes on Escape or outside click.

```tsx
import { NotificationBell } from '@davydzenak_yahor/my-ui-kit'
import type { NotificationItem } from '@davydzenak_yahor/my-ui-kit'

const notifications: NotificationItem[] = [
  {
    id: '1',
    type: 'mention',
    title: 'Alex Johnson mentioned you',
    body: 'Can you review my PR before EOD?',
    timestamp: '2m ago',
    read: false,
    initials: 'AJ',
    avatarColor: 'var(--color-indigo)',
  },
  {
    id: '2',
    type: 'success',
    title: 'Deployment succeeded',
    body: 'v2.4.1 is live',
    timestamp: '1h ago',
    read: false,
  },
]

// Light theme with unread count badge
<NotificationBell
  notifications={notifications}
  onMarkAllRead={() => markAllRead()}
  onDismiss={(id) => dismiss(id)}
/>

// Dark theme
<NotificationBell
  theme="dark"
  notifications={notifications}
  onMarkAllRead={() => markAllRead()}
  onDismiss={(id) => dismiss(id)}
/>

// Loading state
<NotificationBell skeleton />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `theme` | `'light' \| 'dark'` | `'light'` | UI color theme |
| `notifications` | `NotificationItem[]` | `[]` | Notification items to display |
| `skeleton` | `boolean` | `false` | Loading state with shimmer placeholders |
| `defaultOpen` | `boolean` | `false` | Opens the panel on mount — for Storybook previews |
| `onMarkAllRead` | `() => void` | — | Called when the user clicks "Mark all read" |
| `onDismiss` | `(id: string) => void` | — | Called when the user dismisses a notification |

**`NotificationItem` shape:**

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier |
| `type` | `'info' \| 'success' \| 'warning' \| 'mention' \| 'system'` | Determines icon and accent colour |
| `title` | `string` | Primary notification text |
| `body` | `string` | Optional supporting detail |
| `timestamp` | `string` | Human-readable time, e.g. `"2m ago"` |
| `read` | `boolean` | Whether the notification has been seen |
| `initials` | `string` | Two-letter initials for the sender avatar |
| `avatarColor` | `string` | Avatar background color — use a color that passes 4.5:1 contrast with white |

---

## TypeScript

The package ships with full type definitions. No additional `@types` packages needed.

## Links

- [Storybook](https://your-chromatic-url)
- [GitHub](https://github.com/DavydzenakYahor/my-ui-kit)
