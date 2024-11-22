import { useState } from 'react';

import CategoryTab from '@/components/_common/categoryTab';

const MainPage = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const tabs = [
    { label: '예약내역', onClick: () => setActiveIndex(0) },
    { label: '미용완료', onClick: () => setActiveIndex(1) },
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
