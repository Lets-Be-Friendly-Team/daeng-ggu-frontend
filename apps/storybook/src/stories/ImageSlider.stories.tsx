import { ImageSlider } from '@daeng-ggu/design-system';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ImageSlider> = {
  title: 'Daeng-ggu/ImageSlider',
  component: ImageSlider,
  argTypes: {
    list: {
      control: {
        type: 'object',
      },
      description: '이미지 URL 배열',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ImageSlider>;

export const Default: Story = {
  args: {
    list: [
      {
        type: 'image',
        src: 'https://via.placeholder.com/800x600',
      },
      {
        type: 'image',
        src: 'https://via.placeholder.com/800x600',
      },
      {
        type: 'image',
        src: 'https://via.placeholder.com/800x600',
      },
    ],
  },
};
