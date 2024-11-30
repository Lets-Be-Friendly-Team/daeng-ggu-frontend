import { MiniButton } from '@daeng-ggu/design-system';
import type { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Daeng-ggu/MiniButton',
  component: MiniButton,
  argTypes: {
    text: { control: 'text', description: 'Button label text' },
    isActive: { control: 'boolean', description: 'Button active state' },
    onClick: { action: 'clicked', description: 'Button click handler' },
  },
} as Meta;

const Template: StoryFn = (args) => <MiniButton text='hello' {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Click Me',
  isActive: true,
};

export const NotActive = Template.bind({});
NotActive.args = {
  text: 'Active',
  isActive: false,
};
