import { TypeOneButton } from '@daeng-ggu/design-system';
import type { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Daeng-ggu/TypeOneButton',
  component: TypeOneButton,
  argTypes: {
    text: { control: 'text', description: 'Button text' },
    color: {
      control: { type: 'select', options: ['bg-primary', 'bg-secondary', 'bg-white'] },
      description: 'Background color of the button',
    },
    onClick: { action: 'clicked', description: 'Callback for button click event' },
  },
} as Meta;

const Template: StoryFn = (args) => <TypeOneButton text='hello' onClick={() => {}} {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Click Me',
  color: 'bg-primary',
};

export const SecondaryButton = Template.bind({});
SecondaryButton.args = {
  text: 'Secondary Button',
  color: 'bg-secondary',
};

export const CustomText = Template.bind({});
CustomText.args = {
  text: 'Custom Button Text',
  color: 'bg-gray-200',
};
