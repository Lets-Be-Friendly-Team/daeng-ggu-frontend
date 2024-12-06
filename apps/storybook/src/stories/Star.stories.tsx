import { StarIcon } from '@daeng-ggu/design-system';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof StarIcon> = {
  title: 'Daeng-ggu/StarIcon',
  component: StarIcon,
  argTypes: {
    isSelect: {
      control: {
        type: 'boolean',
      },
      description: '별 채우기 여부, 스타일 등등',
    },
  },
};

export default meta;

type Story = StoryObj<typeof StarIcon>;

export const Default: Story = {
  args: {
    isSelect: true,
  },
};

export const Empty: Story = {
  args: {
    isSelect: false,
  },
};
