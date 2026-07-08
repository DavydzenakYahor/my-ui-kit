import type { Meta, StoryObj } from '@storybook/react-vite'
import { UploadDropzone } from './UploadDropzone'

const meta: Meta<typeof UploadDropzone> = {
  title: 'Components/UploadDropzone',
  component: UploadDropzone,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof UploadDropzone>

const makeFakeFile = (name: string, sizeBytes: number) =>
  new File([new ArrayBuffer(sizeBytes)], name)

const DEMO_FILES = [
  makeFakeFile('design_tokens.pdf',   2_400_000),
  makeFakeFile('mockups_v3.jpg',      1_100_000),
  makeFakeFile('component_data.csv',    430_000),
]

export const Idle: Story = {
  args: {
    theme: 'light',
    accept: '.pdf,.jpg,.csv',
    multiple: true,
  },
}

export const Uploading: Story = {
  args: {
    theme: 'light',
    uploadSeconds: 4,
    initialFiles: DEMO_FILES,
  },
}

export const Complete: Story = {
  args: {
    theme: 'light',
    uploadSeconds: 0.01,
    initialFiles: DEMO_FILES,
  },
}

export const Dark: Story = {
  args: {
    theme: 'dark',
    uploadSeconds: 4,
    initialFiles: DEMO_FILES,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}
