import { Header } from '@daeng-ggu/design-system';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Daeng-ggu/Header',
  component: Header,
  argTypes: {
    mode: {
      control: { type: 'select', options: ['main', 'back', 'close'] },
      description: 'Header mode: main, back, or close',
    },
    title: {
      control: 'text',
      description: 'Title for the header (used in back and close modes)',
    },
    onClick: { action: 'clicked', description: 'Callback for button click' },
  },
} as Meta;

const Template: StoryFn = (args) => <Header mode='main' {...args} />;

export const Main = Template.bind({});
Main.args = {
  mode: 'main',
  title: 'Main Header',
  onClick: action('Logo clicked'),
};

export const BackIcon = Template.bind({});
BackIcon.args = {
  mode: 'back',
  title: 'Back Header',
  onClick: action('Back button clicked'),
};

export const CloseIcon = Template.bind({});
CloseIcon.args = {
  mode: 'close',
  title: 'Close Header',
  onClick: action('Close button clicked'),
};
