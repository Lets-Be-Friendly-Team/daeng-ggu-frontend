import { useState } from 'react';
import { StarRating } from '@daeng-ggu/design-system';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof StarRating> = {
  title: 'Daeng-ggu/StarRating',
  component: StarRating,
  argTypes: {
    maxStars: {
      control: {
        type: 'number',
      },
      description: '최대 별 개수',
    },
    ratingState: {
      control: {
        type: 'number',
      },
      description: '현재 별 개수',
    },
    handleOnClick: {
      action: 'clicked',
      description: '별 클릭 시 실행되는 함수',
    },
  },
};

export default meta;

type Story = StoryObj<typeof StarRating>;

export const Default: Story = {
  render: (args) => {
    const StarComponents = () => {
      const [ratingState, setRatingState] = useState(0);
      const handleOnClick = (index: number) => {
        args.handleOnClick(index + 1);
        setRatingState(index + 1);
      };
      return <StarRating ratingState={ratingState} handleOnClick={handleOnClick} maxStars={args.maxStars} />;
    };

    return StarComponents();
  },
};
