import { BorderContainer } from '@daeng-ggu/design-system';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof BorderContainer> = {
  title: 'Daeng-ggu/BorderContainer',
  component: BorderContainer,
  argTypes: {
    bgColor: { control: { type: 'text', options: ['bg-secondary', 'bg-primary'] } },
    innerPadding: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof BorderContainer>;

export const Default: Story = {
  render: (args) => <BorderContainer {...args}>Hello, World!</BorderContainer>,
  args: {
    bgColor: 'bg-secondary',
    innerPadding: 'p-4',
  },
};

export const Primary: Story = {
  render: (args) => <BorderContainer {...args}>Hello, World!</BorderContainer>,
  args: {
    bgColor: 'bg-primary',
    innerPadding: 'p-4',
  },
};
