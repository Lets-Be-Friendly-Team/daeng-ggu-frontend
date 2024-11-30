import {
  BackIcon,
  BellAlertIcon,
  BellIcon,
  CloseIcon,
  MySearchIcon,
  PlusIcon,
  ReportDangIcon,
} from '@daeng-ggu/design-system';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Daeng-ggu/Icon',
  component: BellAlertIcon,
  argTypes: {
    className: { control: 'text', description: 'Icon class name' },
  },
};

export default meta;

type Story = StoryObj<typeof BellAlertIcon>;

export const AllIcons: Story = {
  render: (args) => (
    <div className='flex flex-wrap gap-4'>
      <div className='flex flex-col items-center'>
        <BellAlertIcon {...args} />
        <span>BellAlertIcon</span>
      </div>
      <div className='flex flex-col items-center'>
        <CloseIcon {...args} />
        <span>CloseIcon</span>
      </div>
      <div className='flex flex-col items-center'>
        <BackIcon {...args} />
        <span>BackIcon</span>
      </div>
      <div className='flex flex-col items-center'>
        <BellIcon {...args} />
        <span>BellIcon</span>
      </div>
      <div className='flex flex-col items-center'>
        <MySearchIcon {...args} />
        <span>MySearchIcon</span>
      </div>
      <div className='flex flex-col items-center'>
        <PlusIcon {...args} />
        <span>PlusIcon</span>
      </div>
      <div className='flex flex-col items-center'>
        <ReportDangIcon {...args} />
        <span>ReportDangIcon</span>
      </div>
    </div>
  ),
  args: {
    className: 'text-primary text-xl',
  },
};
