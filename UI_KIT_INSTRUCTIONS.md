# my-ui-kit — Project Instructions

> **Language note for AI assistant:** All communication with the user (Yahor) must be in **Russian**. Code, comments, and documentation stay in English.

---

## What this is and why

A pet project for learning and demonstrating UI Kit engineer skills.  
Goal: portfolio piece to show at interviews (target role — CoinsPaid Frontend Engineer).

Stack: **React + TypeScript + Vite + Storybook**

---

## What's already done

### 1. Scaffolding
- Project created via `npm create vite@latest my-ui-kit -- --template react-ts`
- Storybook installed via `npx storybook@latest init`
- Removed `src/stories` folder (default boilerplate from Storybook)

### 2. Design tokens
File `src/tokens/index.css` — CSS custom properties, the foundation of the entire system.  
Tokens are imported globally in `.storybook/preview.ts`.

```css
:root {
  /* Colors */
  --color-primary: #6366f1;
  --color-primary-hover: #4f46e5;
  --color-danger: #ef4444;
  --color-danger-hover: #dc2626;
  --color-neutral: #6b7280;
  --color-neutral-hover: #4b5563;

  /* Text */
  --color-text-on-primary: #ffffff;
  --color-text-default: #111827;

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;

  /* Spacing */
  --space-sm: 8px;
  --space-md: 16px;

  /* Typography */
  --font-size-sm: 14px;
  --font-size-md: 16px;
  --font-weight-medium: 500;
}
```

### 3. Project structure

```
src/
├── tokens/
│   └── index.css          # CSS custom properties (design tokens)
├── components/
│   └── Button/
│       ├── Button.tsx
│       ├── Button.css
│       └── Button.stories.tsx
└── index.ts               # public library exports
```

`.storybook/preview.ts` — global Storybook config, tokens are imported here.

---

## Current status

Storybook is running (`npm run storybook` → `http://localhost:6006`).  
Tokens are created and connected.  
**Next step: implement the Button component.**

---

## Roadmap

| Stage | What | Status |
|-------|------|--------|
| 1 | Scaffolding + Storybook | ✅ Done |
| 2 | Design tokens | ✅ Done |
| 3 | Components: Button, Input, Badge + stories | 🔄 In progress |
| 4 | MDX documentation for one component | ⬜ |
| 5 | Visual testing via Chromatic | ⬜ |
| 6 | CI/CD via GitHub Actions | ⬜ |
| 7 | Publish as npm package | ⬜ |

---

## Button component — what to implement

### Props
```ts
interface ButtonProps {
  variant?: 'primary' | 'danger' | 'neutral'  // visual style
  size?: 'sm' | 'md'                           // size
  disabled?: boolean
  onClick?: () => void
  children: React.ReactNode
}
```

### Button.tsx — structure
- Functional component
- className built dynamically via template literals: `btn btn--${variant} btn--${size}`
- ARIA: when `disabled` — add `aria-disabled="true"` and suppress onClick

### Button.css — styles
- All colors, spacing, and radii must use CSS variables from tokens
- No hardcoded values like `color: #6366f1`

### Button.stories.tsx — structure
```ts
export default {
  title: 'Components/Button',
  component: Button,
}

export const Primary = { args: { variant: 'primary', children: 'Click me' } }
export const Danger = { args: { variant: 'danger', children: 'Delete' } }
export const Neutral = { args: { variant: 'neutral', children: 'Cancel' } }
export const Disabled = { args: { variant: 'primary', disabled: true, children: 'Disabled' } }
export const Small = { args: { variant: 'primary', size: 'sm', children: 'Small' } }
```

---

## Core principles

1. **Tokens everywhere** — no magic values in CSS
2. **No third-party UI dependencies** — components built from scratch (no MUI, Radix, etc.)
3. **ARIA from the start** — every component must be accessible to screen readers
4. **Stories = documentation** — every component variant lives in Storybook

---

## Commands

```bash
npm run storybook     # start Storybook at :6006
npm run dev           # start Vite dev server
npm run build         # build the project
```
