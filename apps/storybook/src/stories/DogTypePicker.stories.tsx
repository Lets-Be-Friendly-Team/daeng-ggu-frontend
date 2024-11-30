import { useState } from 'react';
import { DogTypePicker } from '@daeng-ggu/design-system';
import type { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Daeng-ggu/DogTypePicker',
  component: DogTypePicker,
  argTypes: {
    type: { control: { type: 'radio', options: ['radio', 'checkbox'] }, description: 'Type of picker' },
    selectedValues: { control: 'object', description: 'Selected values' },
    onChange: { action: 'changed', description: 'Change handler' },
  },
} as Meta;

const Template: StoryFn = (args) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(args.selectedValues);

  const handleChange = (values: string[]) => {
    setSelectedValues(values);
    args.onChange(values);
  };

  return <DogTypePicker {...args} selectedValues={selectedValues} onChange={handleChange} />;
};

export const RadioType = Template.bind({});
RadioType.args = {
  type: 'radio',
  selectedValues: ['소형견'], // Default selected value
};

export const CheckboxType = Template.bind({});
CheckboxType.args = {
  type: 'checkbox',
  selectedValues: ['중형견'], // Default selected value
};
