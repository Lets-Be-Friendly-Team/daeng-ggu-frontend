import { Toast } from '@daeng-ggu/design-system';
import { ToastContainer } from '@daeng-ggu/design-system';
import { useToast } from '@daeng-ggu/shared';
import type { Meta, StoryFn } from '@storybook/react';
/**
 * Toast는 사용자에게 일정시간 동안 알림을 주는 컴포넌트입니다.
 */
const meta: Meta<typeof Toast> = {
  title: 'daeng-ggu/Toast',
  component: ToastContainer,
  decorators: [
    (Story) => (
      <>
        <ToastContainer />
        <Story />
      </>
    ),
  ],
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['none', 'confirm', 'warning', 'error'],
      },
    },
    message: {
      control: {
        type: 'text',
      },
    },
  },
};

export default meta;

export const Template: StoryFn = (args) => {
  const { showToast } = useToast();

  return (
    <div style={{ height: '100px' }}>
      <button onClick={() => showToast({ message: args.message, type: args.type })}>토스트 출력</button>
    </div>
  );
};

export const Confirm = Template.bind({});
Confirm.args = {
  type: 'confirm',
  message: '확인!',
};

export const Error = Template.bind({});
Error.args = {
  type: 'error',
  message: '에러에요!',
};

export const Warning = Template.bind({});
Warning.args = {
  type: 'warning',
  message: '없어요!',
};
