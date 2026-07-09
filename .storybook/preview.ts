/// <reference types="vite/client" />
import '../src/tokens/index.css';
import type { Preview } from '@storybook/react-vite'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FCFBF9' },
        { name: 'dark', value: '#191816' },
      ],
    },

    a11y: {
      test: 'todo'
    }
  },
};

export default preview;