import { MouseEvent, useState } from 'react';
import { Calendar } from '@daeng-ggu/design-system';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Calendar> = {
  title: 'Example/Calendar',
  component: Calendar,
  argTypes: {
    selected: { control: 'date' },
    onDayClick: { action: 'clicked' },
    onSelect: { action: 'selected' },
  },
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: (args) => {
    const CalendarWithState = () => {
      const [selected, setSelected] = useState<Date>(new Date());

      const handleDayClick = (value: Date, activeModifiers: Record<string, true>, event: MouseEvent) => {
        if (args.onDayClick) {
          args.onDayClick(value, activeModifiers, event);
        }
        setSelected(value);
      };

      return <Calendar selected={selected} onDayClick={handleDayClick} />;
    };

    return <CalendarWithState />;
  },
  args: {
    selected: new Date(),
  },
};
