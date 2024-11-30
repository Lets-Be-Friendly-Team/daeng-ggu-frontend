import React from 'react';
import { Layout } from '@daeng-ggu/design-system';
import type { Preview } from '@storybook/react';

import '@daeng-ggu/design-system/styles/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const decorators = [
  (Story) => {
    document.documentElement.style.fontSize = '62.5%'; // 1rem = 10px
    return (
      <Layout>
        <Story />
      </Layout>
    );
  },
];

export default preview;
