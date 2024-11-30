import { CategoryTab } from '@daeng-ggu/design-system';
import type { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Daeng-ggu/CategoryTab',
  component: CategoryTab,
  argTypes: {
    tabs: { control: 'object', description: 'List of tabs with labels and contents' },
  },
} as Meta;

const Template: StoryFn = (args) => <CategoryTab tabs={[]} {...args} />;

export const Default = Template.bind({});
Default.args = {
  tabs: [
    {
      label: 'Tab 1',
      content: <div className='p-4'>Content for Tab 1</div>,
    },
    {
      label: 'Tab 2',
      content: <div className='p-4'>Content for Tab 2</div>,
    },
    {
      label: 'Tab 3',
      content: <div className='p-4'>Content for Tab 3</div>,
    },
  ],
};

export const TwoTabs = Template.bind({});
TwoTabs.args = {
  tabs: [
    {
      label: 'Completed',
      content: <div className='p-4'>All completed tasks are here.</div>,
    },
    {
      label: 'Pending',
      content: <div className='p-4'>Pending tasks are shown here.</div>,
    },
  ],
};
