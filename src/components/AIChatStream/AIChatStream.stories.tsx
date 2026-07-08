import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { AIChatStream } from './AIChatStream'

const meta: Meta<typeof AIChatStream> = {
  title: 'Components/AIChatStream',
  component: AIChatStream,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof AIChatStream>

const QUESTION = 'What are CSS custom properties and how do they work?'
const ANSWER = 'CSS custom properties — also called CSS variables — let you define reusable values once and reference them anywhere in your stylesheet. They cascade through the DOM just like regular properties, and can be overridden at any scope with a simple selector.'

export const Thinking: Story = {
  args: {
    theme: 'light',
    phase: 'thinking',
    question: QUESTION,
  },
}

export const ToolCall: Story = {
  args: {
    theme: 'light',
    phase: 'tool-running',
    question: QUESTION,
    toolName: 'search_web · mdn.org',
  },
}

export const Streaming: Story = {
  args: {
    theme: 'light',
    streamSpeed: 3,
    question: QUESTION,
    answer: ANSWER,
  },
  render: args => {
    const [phase, setPhase] = useState<'streaming' | 'complete'>('streaming')
    return (
      <AIChatStream
        {...args}
        phase={phase}
        onComplete={() => setPhase('complete')}
      />
    )
  },
}

export const Complete: Story = {
  args: {
    theme: 'dark',
    phase: 'complete',
    question: QUESTION,
    answer: ANSWER,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}
