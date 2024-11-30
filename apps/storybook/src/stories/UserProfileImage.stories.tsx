import { UserProfileImage } from '@daeng-ggu/design-system';
import type { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Daeng-ggu/UserProfileImage',
  component: UserProfileImage,
  argTypes: {
    imageUrl: { control: 'text', description: 'URL of the user profile image' },
    size: {
      control: { type: 'select', options: ['small', 'large'] },
      description: 'Size of the profile image',
    },
    onClick: { action: 'clicked', description: 'Callback when the image is clicked' },
  },
} as Meta;

const Template: StoryFn = (args) => <UserProfileImage {...args} />;

export const Default = Template.bind({});
Default.args = {
  imageUrl: '',
  size: 'large',
};

export const SmallSize = Template.bind({});
SmallSize.args = {
  imageUrl:
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzExMDJfMTQx%2FMDAxNjk4OTA5MDYxMzg4.0eFjVmOpEItjaKyS8mXnwsUzcydZxCvJL8yaTDnH5AQg.fdrh4ialzABAAMevd2UNLubPhT32KxJR95vysY62OO0g.JPEG.eh60135%2F%25C0%25DA%25C0%25CC%25BE%25F0%25C6%25AE%25B8%25BB%25B6%25F3%25B9%25C2%25C6%25AE12.jpg&type=a340',
  size: 'small',
};

export const LargeSize = Template.bind({});
LargeSize.args = {
  imageUrl:
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzExMDJfMTQx%2FMDAxNjk4OTA5MDYxMzg4.0eFjVmOpEItjaKyS8mXnwsUzcydZxCvJL8yaTDnH5AQg.fdrh4ialzABAAMevd2UNLubPhT32KxJR95vysY62OO0g.JPEG.eh60135%2F%25C0%25DA%25C0%25CC%25BE%25F0%25C6%25AE%25B8%25BB%25B6%25F3%25B9%25C2%25C6%25AE12.jpg&type=a340',
  size: 'large',
};
