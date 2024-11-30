import { Avatar } from '@daeng-ggu/design-system';
import type { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Daeng-ggu/Avatar',
  component: Avatar,
  argTypes: {
    mode: {
      control: {
        type: 'select',
        options: ['avatar', 'add', 'request', 'requestView', 'designerCard'],
      },
    },
    isActive: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
} as Meta;

const Template: StoryFn = (args) => <Avatar mode='avatar' {...args} />;

export const AvatarMode = Template.bind({});
AvatarMode.args = {
  mode: 'avatar',
  imageUrl:
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA2MTJfMTEx%2FMDAxNzE4MTkzMjA3MzIx.d27ABl1vOs5N63fiMx-bprp7GwTJC1ZVsr77Dm71H28g.Ru7mbScWnLaSV3hfjd1pXS8yPOYdP0bV-mViGwxq4dgg.JPEG%2FKakaoTalk_20240612_203255635_04.jpg&type=a340',
  name: 'John Doe',
  isActive: false,
};

export const AddMode = Template.bind({});
AddMode.args = {
  mode: 'add',
  isActive: true,
};

export const RequestMode = Template.bind({});
RequestMode.args = {
  mode: 'request',
  isActive: false,
};

export const RequestViewMode = Template.bind({});
RequestViewMode.args = {
  mode: 'requestView',
  imageUrl:
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA2MTJfMTEx%2FMDAxNzE4MTkzMjA3MzIx.d27ABl1vOs5N63fiMx-bprp7GwTJC1ZVsr77Dm71H28g.Ru7mbScWnLaSV3hfjd1pXS8yPOYdP0bV-mViGwxq4dgg.JPEG%2FKakaoTalk_20240612_203255635_04.jpg&type=a340',
  name: 'Jane Doe',
  isActive: true,
};

export const DesignerCardMode = Template.bind({});
DesignerCardMode.args = {
  mode: 'designerCard',
  imageUrl:
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA2MTJfMTEx%2FMDAxNzE4MTkzMjA3MzIx.d27ABl1vOs5N63fiMx-bprp7GwTJC1ZVsr77Dm71H28g.Ru7mbScWnLaSV3hfjd1pXS8yPOYdP0bV-mViGwxq4dgg.JPEG%2FKakaoTalk_20240612_203255635_04.jpg&type=a340',
  name: 'Designer Name',
  containerClassName: 'h-[70px] w-[70px]',
  isActive: true,
};
