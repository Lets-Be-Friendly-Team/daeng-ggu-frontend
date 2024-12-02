import { useState } from 'react';
import { TimeSelect } from '@daeng-ggu/design-system';
import type { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Daeng-ggu/TimeSelect',
  component: TimeSelect,
  argTypes: {
    availableTimes: { control: 'object', description: 'Available times to select' },
    selectValue: { control: 'number', description: 'Selected time value' },
    onSelectChange: { action: 'selected', description: 'Triggered when the time selection changes' },
  },
} as Meta;

const Template: StoryFn = (args) => {
  const [selectedTime, setSelectedTime] = useState<number>(args.selectValue);

  const handleSelectChange = (time: number) => {
    setSelectedTime(time);
    args.onSelectChange(time);
  };

  return (
    <TimeSelect
      {...args}
      availableTimes={[9, 12, 14, 15, 18]}
      selectValue={selectedTime}
      onSelectChange={handleSelectChange}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  availableTimes: [9, 10, 11, 13, 15, 16, 18],
  selectValue: 9,
};

export const AllAvailable = Template.bind({});
AllAvailable.args = {
  availableTimes: Array.from({ length: 12 }, (_, index) => index + 9),
  selectValue: 9,
};

export const NoAvailableTimes = Template.bind({});
NoAvailableTimes.args = {
  availableTimes: [],
  selectValue: 9,
};
