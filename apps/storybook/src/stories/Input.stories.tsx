import React, { useState } from 'react';
import { Input } from '@daeng-ggu/design-system';
import type { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Daeng-ggu/Input',
  component: Input,
  argTypes: {
    label: { control: 'text', description: 'Label text for the input field' },
    type: { control: 'text', description: 'Input type (e.g., text, number, password)' },
    placeholder: { control: 'text', description: 'Placeholder text for the input field' },
    value: { control: 'text', description: 'Value of the input field' },
    width: { control: 'text', description: 'Width of the input field (e.g., 50%, 300px)' },
    height: { control: 'text', description: 'Height of the input field (e.g., 5rem, 50px)' },
    onChange: { action: 'changed', description: 'Callback for input value changes' },
  },
} as Meta;

const Template: StoryFn = (args) => {
  const [value, setValue] = useState<string | number | ReadonlyArray<string>>(args.value || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (args.onChange) args.onChange(e);
  };

  return <Input {...args} value={value} onChange={handleChange} />;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Default Input',
  type: 'text',
  placeholder: 'Enter some text...',
};

export const NumberInput = Template.bind({});
NumberInput.args = {
  label: 'Number Input',
  type: 'number',
  placeholder: 'Enter a number...',
};

export const CustomSizeInput = Template.bind({});
CustomSizeInput.args = {
  label: 'Custom Size Input',
  width: '50%',
  height: '5rem',
  placeholder: 'Custom width and height',
};

export const WithoutLabel = Template.bind({});
WithoutLabel.args = {
  placeholder: 'Input without label',
  width: '300px',
  height: '40px',
};
