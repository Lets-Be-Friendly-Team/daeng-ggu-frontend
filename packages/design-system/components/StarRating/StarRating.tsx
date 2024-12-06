import { useState } from 'react';

import StarIcon from '../Icons/StarIcon';

const StarRating = ({
  ratingState,
  handleOnClick,
  maxStars = 5,
}: {
  ratingState: number;
  handleOnClick: (_index: number) => void;
  maxStars?: number;
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null); // 호버 시 임시 점수, null로 초기화

  // 별에 마우스를 올렸을 때의 동작
  const handleMouseOver = (index: number) => {
    if (index + 1 > ratingState) {
      setHoverRating(index + 1); // 클릭한 점수보다 큰 경우에만 업데이트
    } else {
      setHoverRating(null); // 작거나 같으면 hover 상태를 무시
    }
  };

  // 마우스를 별에서 뗐을 때의 동작
  const handleMouseLeave = () => {
    setHoverRating(null); // 호버 점수 초기화
  };

  return (
    <div className='flex space-x-1'>
      {Array.from({ length: maxStars }, (_, index) => (
        <StarIcon
          key={index}
          onClick={() => handleOnClick(index)}
          onMouseOver={() => handleMouseOver(index)}
          onMouseLeave={handleMouseLeave}
          isSelect={index < (hoverRating ?? ratingState)} // 호버 점수가 null이면 클릭 점수 사용
        />
      ))}
    </div>
  );
};

export default StarRating;
