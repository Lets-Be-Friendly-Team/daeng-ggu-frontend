import { Progress } from '@daeng-ggu/design-system';
import type { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Daeng-ggu/Progress',
  component: Progress,
  argTypes: {
    text: { control: 'text', description: 'Label text above the progress bar' },
    value: {
      control: { type: 'number', min: 0 },
      description: 'Current progress value',
    },
    maxStep: {
      control: { type: 'number', min: 1 },
      description: 'Maximum value for the progress',
    },
    className: { control: 'text', description: 'Custom CSS classes for the progress container' },
  },
} as Meta;

const Template: StoryFn = (args) => <Progress {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Progress Example',
  value: 5,
  maxStep: 10,
};

export const HalfProgress = Template.bind({});
HalfProgress.args = {
  text: '50% Complete',
  value: 5,
  maxStep: 10,
};

export const FullProgress = Template.bind({});
FullProgress.args = {
  text: 'Completed',
  value: 10,
  maxStep: 10,
};

export const CustomProgress = Template.bind({});
CustomProgress.args = {
  text: 'Custom Steps',
  value: 1,
  maxStep: 7,
  className: 'bg-gray-300',
};
