import { TypeTwoButton } from '@daeng-ggu/design-system';
import type { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Daeng-ggu/TypeTwoButton',
  component: TypeTwoButton,
  argTypes: {
    text: { control: 'text', description: 'Button text' },
    color: {
      control: { type: 'select', options: ['bg-primary', 'bg-secondary', 'bg-white'] },
      description: 'Background color of the button',
    },
    onClick: { action: 'clicked', description: 'Callback for button click event' },
  },
} as Meta;

const Template: StoryFn = (args) => <TypeTwoButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Default Button',
  color: 'bg-primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  text: 'Secondary Button',
  color: 'bg-secondary',
};

export const White = Template.bind({});
White.args = {
  text: '',
  color: 'bg-white',
};
