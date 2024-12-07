import { MemoryRouter } from 'react-router-dom';
import { Header } from '@daeng-ggu/design-system';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Header> = {
  title: 'daeng-ggu/Header',
  component: Header,
  argTypes: {
    mode: {
      control: 'select',
      options: ['main', 'back', 'close', 'customBack'],
      description: '헤더의 모드',
      defaultValue: 'main',
    },
    title: {
      control: 'text',
      description: '헤더의 제목',
    },
    onClick: {
      action: 'onClick',
      description: '클릭 시 실행되는 콜백 함수',
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Header>;

export const MainHeader: Story = {
  args: {
    mode: 'main',
  },
};

export const BackHeader: Story = {
  args: {
    mode: 'back',
    title: '뒤로가기',
  },
};

export const CloseHeader: Story = {
  args: {
    mode: 'close',
    title: '닫기',
  },
};

export const CustomBackHeader: Story = {
  args: {
    mode: 'customBack',
    title: '사용자 지정 뒤로가기',
    onClick: () => alert('Custom Back Clicked!'),
  },
};
