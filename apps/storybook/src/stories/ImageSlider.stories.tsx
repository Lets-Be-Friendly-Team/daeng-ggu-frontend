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
      'https://via.placeholder.com/400x300?text=Image+1',
      'https://via.placeholder.com/400x300?text=Image+2',
      'https://via.placeholder.com/400x300?text=Image+3',
    ],
  },
};
