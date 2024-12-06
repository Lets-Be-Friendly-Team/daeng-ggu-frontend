import { useState } from 'react';

import { cn } from '../../lib/utils';
import HalfStarIcon from '../Icons/HalfStarIcon';
import StarIcon from '../Icons/StarIcon';

const StarRating = ({
  className,
  maxStars = 5,
  ratingState,
  setRatingState,
}: {
  className?: string;
  maxStars?: number;
  ratingState: number;
  setRatingState: (_newRating: number) => void;
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null); // 호버 시 임시 점수, null로 초기화

  const handleClick = (index: number, isHalf: boolean) => {
    const newRating = index + (isHalf ? 0.5 : 1); // 반 클릭이면 0.5 추가
    setRatingState(newRating);
  };

  const handleMouseOver = (index: number, isHalf: boolean) => {
    const newHoverRating = index + (isHalf ? 0.5 : 1); // 반 호버이면 0.5 추가
    setHoverRating(newHoverRating);
  };

  const handleMouseLeave = () => {
    setHoverRating(null); // 호버 점수 초기화
  };

  return (
    <div className={cn(className)}>
      <span className='text-sub_h1 font-semibold text-gray-800'>별점</span>
      <div className='flex space-x-1'>
        {Array.from({ length: maxStars }, (_, index) => {
          const currentRating = hoverRating ?? ratingState;

          const isFullSelected = index + 1 <= currentRating; // 전체 별이 선택되었는지
          const isHalfSelected = !isFullSelected && index + 0.5 <= currentRating; // 반별이 선택되었는지

          return (
            <div key={index} className='relative'>
              {isFullSelected ? <StarIcon isSelect /> : isHalfSelected ? <HalfStarIcon /> : <StarIcon />}
              <div
                className='absolute left-0 top-0 z-10 h-full w-1/2 cursor-pointer'
                onClick={() => handleClick(index, true)}
                onMouseOver={() => handleMouseOver(index, true)}
                onMouseLeave={handleMouseLeave}
              />
              <div
                className='absolute right-0 top-0 z-10 h-full w-1/2 cursor-pointer'
                onClick={() => handleClick(index, false)}
                onMouseOver={() => handleMouseOver(index, false)}
                onMouseLeave={handleMouseLeave}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StarRating;
