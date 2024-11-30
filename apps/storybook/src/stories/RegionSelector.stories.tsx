import { RegionSelector } from '@daeng-ggu/design-system';
import type { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Daeng-ggu/RegionSelector',
  component: RegionSelector,
  argTypes: {
    onSelectionChange: {
      action: 'selectionChanged',
      description: 'Triggered when a region or sub-region is selected',
    },
  },
} as Meta;

const Template: StoryFn = (args) => <RegionSelector {...args} />;

export const Default = Template.bind({});
Default.args = {};
