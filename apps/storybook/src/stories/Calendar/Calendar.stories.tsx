import { useState } from 'react';
import { Calendar } from '@daeng-ggu/design-system';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Calendar> = {
  title: 'Example/Calendar',
  component: Calendar,
  args: {
    mode: 'single',
  },
  argTypes: {
    selected: { control: 'date' },
    mode: { control: { type: 'select', options: ['single'] } },
    onDayClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: () => {
    const CalendarWithState = () => {
      const [selected, setSelected] = useState<Date>(new Date());

      return <Calendar selected={selected} onDayClick={(value) => setSelected(value)} />;
    };

    return <CalendarWithState />;
  },
};
