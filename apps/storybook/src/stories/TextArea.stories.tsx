import { ChangeEvent, useState } from 'react';
import { TextArea } from '@daeng-ggu/design-system';
import type { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Daeng-ggu/TextArea',
  component: TextArea,
  argTypes: {
    label: { control: 'text', description: 'Label for the text area' },
    id: { control: 'text', description: 'ID for the text area' },
    name: { control: 'text', description: 'Name attribute of the text area' },
    placeholder: { control: 'text', description: 'Placeholder text for the text area' },
    value: { control: 'text', description: 'Current value of the text area' },
    width: { control: 'text', description: 'Custom width for the text area' },
    height: { control: 'text', description: 'Custom height for the text area' },
    maxLength: { control: 'number', description: 'Maximum number of characters allowed' },
    bgColor: { control: 'text', description: 'Background color of the text area' },
    borderWidth: { control: 'text', description: 'Border width of the text area' },
    borderColor: { control: 'text', description: 'Border color of the text area' },
    onChange: { action: 'changed', description: 'Callback for text change events' },
  },
} as Meta;

const Template: StoryFn = (args) => {
  const [value, setValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    if (args.onChange) {
      args.onChange(event.target.value);
    }
  };

  return <TextArea {...args} value={value} onChange={handleChange} />;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Default Text Area',
  placeholder: 'Enter some text...',
};

export const WithMaxLength = Template.bind({});
WithMaxLength.args = {
  label: 'With Max Length',
  placeholder: 'Enter text with limit...',
  maxLength: 50,
};

export const CustomStyles = Template.bind({});
CustomStyles.args = {
  label: 'Custom Styles',
  placeholder: 'Custom styles applied',
  bgColor: 'bg-blue-50',
  borderWidth: 'border-2',
  borderColor: 'border-blue-500',
  height: '150px',
  width: '300px',
};

export const WithoutLabel = Template.bind({});
WithoutLabel.args = {
  placeholder: 'No label',
};
