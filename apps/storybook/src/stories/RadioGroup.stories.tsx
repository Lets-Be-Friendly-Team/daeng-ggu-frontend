import { RadioGroup, RadioGroupItem } from '@daeng-ggu/design-system';
import type { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Daeng-ggu/RadioGroup',
  component: RadioGroup,
  argTypes: {
    size: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Size of the radio buttons (in rem)',
    },
    className: {
      control: 'text',
      description: 'Custom class names for the RadioGroup',
    },
    onValueChange: {
      action: 'changed',
      description: 'Callback when the selected radio button changes',
    },
  },
} as Meta;

const Template: StoryFn = (args) => (
  <RadioGroup {...args} className='flex flex-col gap-2' onValueChange={args.onValueChange}>
    <label className='flex cursor-pointer items-center gap-2'>
      <RadioGroupItem value='option1' size={0.5} />
      <span className='text-sub_h3 font-bold text-gray-800'>Option 1</span>
    </label>
    <label className='flex cursor-pointer items-center gap-2'>
      <RadioGroupItem value='option2' size={0.5} />
      <span className='text-sub_h3 font-bold text-gray-800'>Option 2</span>
    </label>
    <label className='flex cursor-pointer items-center gap-2'>
      <RadioGroupItem value='option3' size={0.5} />
      <span className='text-sub_h3 font-bold text-gray-800'>Option 3</span>
    </label>
  </RadioGroup>
);

export const Default = Template.bind({});
