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

If TypeScript complains about the CSS import, add this to a `declarations.d.ts` file in your project:

```ts
declare module '@davydzenak_yahor/my-ui-kit/styles'
```

## Usage

```tsx
import {
  Button,
  Input,
  Badge,
  PaymentCard,
  BeforeAfterSlider,
  UploadDropzone,
  AIChatStream,
} from '@davydzenak_yahor/my-ui-kit'
```

## Components

- **Button** — action button with light/dark theme, size and disabled state
- **Input** — text input with label, placeholder, error message and disabled state
- **Badge** — status label with semantic color variants and two sizes
- **PaymentCard** — 3D flip card showing card details on front and CVV on back
- **BeforeAfterSlider** — drag-to-compare slider with CSS filter support for before/after images
- **UploadDropzone** — multi-file drag & drop zone with sequential upload simulation and progress bars
- **AIChatStream** — streaming AI chat UI with thinking, tool call, streaming and complete phases

## TypeScript

The package ships with full type definitions. No additional `@types` packages needed.

## Links

- [Storybook](https://your-chromatic-url)
- [GitHub](https://github.com/DavydzenakYahor/my-ui-kit)