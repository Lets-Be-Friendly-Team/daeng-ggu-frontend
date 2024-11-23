import { useState } from 'react';

import CategoryTab from '@/components/_common/categoryTab';

const MainPage = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const tabs = [
    { label: '반려견', onClick: () => setActiveIndex(0) },
    { label: '리뷰', onClick: () => setActiveIndex(1) },
    { label: '찜한 목록', onClick: () => setActiveIndex(2) },
  ];
  return (
    <div>
      <div className='text-xl font-bold'>MainPage</div>

      <div className='font-pretendard-variable text-xl'>
        <CategoryTab tabs={tabs} activeIndex={activeIndex} />
      </div>
    </div>
  );
};

export default MainPage;
