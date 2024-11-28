import { Calendar } from '@daeng-ggu/design-system';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/Calendar',
  component: Calendar,
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    showOutsideDays: false,
  },
};
