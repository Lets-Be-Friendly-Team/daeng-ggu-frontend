import { useState } from 'react';
import { ImageUploader } from '@daeng-ggu/design-system';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ImageUploader> = {
  title: 'Daeng-ggu/ImageUploader',
  component: ImageUploader,
  argTypes: {
    label: {
      control: 'text',
      description: '업로더 상단에 표시할 레이블',
      defaultValue: '이미지 업로드',
    },
    initialImgList: {
      control: 'object',
      description: '초기 이미지 URL 배열',
      defaultValue: ['https://via.placeholder.com/150', 'https://via.placeholder.com/200'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof ImageUploader>;

export const Default: Story = {
  render: (args) => {
    const ImageStateComponent = () => {
      const [imgList, setImgList] = useState<File[]>([]);

      return <ImageUploader {...args} imgList={imgList} setImgList={setImgList} />;
    };
    return <ImageStateComponent />;
  },
};
