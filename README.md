# @davydzenak_yahor/my-ui-kit

A reusable React UI component library built with TypeScript, design tokens, and Storybook.

## Installation

```bash
npm install @davydzenak_yahor/my-ui-kit
```

## Usage

```tsx
import { Button, Input, Badge } from '@davydzenak_yahor/my-ui-kit';
import '@davydzenak_yahor/my-ui-kit/styles';

function App() {
  return (
    <Button variant="primary">Click me</Button>
  );
}
```

## TypeScript setup

Add the following to your `declarations.d.ts` file:

```ts
declare module '@davydzenak_yahor/my-ui-kit/styles';
```

## Components

- **Button** — `variant`: primary | danger | neutral. `size`: sm | md. `disabled`
- **Input** — `label`, `placeholder`, `error`, `disabled`
- **Badge** — `label`, `variant`: primary | danger | neutral | success. `size`: sm | md

## Links

- [Storybook](https://your-chromatic-url)
- [GitHub](https://github.com/DavydzenakYahor/my-ui-kit)