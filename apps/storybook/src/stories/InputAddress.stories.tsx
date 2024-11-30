import { InputAddress } from '@daeng-ggu/design-system'; // 모의 구현으로 대체 필요 시 포함
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Daeng-ggu/InputAddress',
  component: InputAddress,
  argTypes: {
    label: { control: 'text', description: 'Label for the address input field' },
  },
} as Meta;

const Template: StoryFn = (args) => {
  return (
    <div>
      <InputAddress label='주소' {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: '주소',
};
