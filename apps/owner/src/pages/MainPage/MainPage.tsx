import { useState } from 'react';
import { CategoryTab } from '@daeng-ggu/design-system';

const MainPage = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const tabs = [
    { label: '반려견', onClick: () => setActiveIndex(0) },
    { label: '리뷰', onClick: () => setActiveIndex(1) },
    { label: '찜한 목록', onClick: () => setActiveIndex(2) },
  ];
  return (
    <div>
      <div className='text-xl font-bold'>MainPagee</div>

      <div className='font-pretendard-variable text-xl'>
        <CategoryTab tabs={tabs} activeIndex={activeIndex} />
      </div>
    </div>
  );
};

export default MainPage;
