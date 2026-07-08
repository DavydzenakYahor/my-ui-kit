import type { Meta, StoryObj } from '@storybook/react-vite'
import { BeforeAfterSlider } from './BeforeAfterSlider'

const SUNSET_GRADIENT = 'linear-gradient(to bottom, #1A0533 5%, #6B1D52 30%, #E0526B 55%, #FF7A3D 72%, #FFC26B 88%, #FFE5A0 100%)'
const HOUSE_IMAGE = 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=560&h=340&fit=crop&auto=format'

const meta: Meta<typeof BeforeAfterSlider> = {
  title: 'Components/BeforeAfterSlider',
  component: BeforeAfterSlider,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof BeforeAfterSlider>

export const ColorGrade: Story = {
  args: {
    gradient: SUNSET_GRADIENT,
    beforeFilter: 'grayscale(1)',
    badge: 'GRADED',
    filename: 'sunset_raw.cr3',
    defaultPosition: 40,
  },
}

export const Disabled: Story = {
  args: {
    gradient: SUNSET_GRADIENT,
    beforeFilter: 'grayscale(1)',
    badge: 'GRADED',
    filename: 'sunset_raw.cr3',
    defaultPosition: 50,
    disabled: true,
  },
}

export const Skeleton: Story = {
  args: {
    skeleton: true,
    filename: 'loading...',
  },
}

export const Upscale: Story = {
  args: {
    imageSrc: HOUSE_IMAGE,
    beforeFilter: 'blur(6px) grayscale(0.6)',
    badge: 'UPSCALED',
    filename: 'house_001.arw',
    defaultPosition: 35,
  },
}
