import { Modal } from '@daeng-ggu/design-system';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Modal> = {
  title: 'daeng-ggu/Modal',
  component: Modal,
  argTypes: {
    title: {
      control: 'text',
      description: '모달의 제목',
      defaultValue: 'Modal Title',
    },
    description: {
      control: 'text',
      description: '모달의 설명',
      defaultValue: 'This is a modal description.',
    },
    confirmText: {
      control: 'text',
      description: '확인 버튼 텍스트',
      defaultValue: 'Confirm',
    },
    cancelText: {
      control: 'text',
      description: '취소 버튼 텍스트',
      defaultValue: 'Cancel',
    },
    onClose: {
      action: 'clicked close',
      description: '취소 버튼 클릭 이벤트',
    },
    onConfirm: {
      action: 'clicked confirm',
      description: '확인 버튼 클릭 이벤트',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    title: 'Modal Title',
    description: 'This is a modal description.',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    onClose: () => console.log('Close button clicked'),
    onConfirm: () => console.log('Confirm button clicked'),
  },
  render: (args) => <Modal {...args}></Modal>,
};
