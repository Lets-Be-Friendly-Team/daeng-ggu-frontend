// import
import { useEffect, useRef, useState } from 'react';

import map from '@/assets/images/MainCategoryTab/map.png';
import popular from '@/assets/images/MainCategoryTab/popular.png';
import premium from '@/assets/images/MainCategoryTab/premium.png';
import total from '@/assets/images/MainCategoryTab/total.png';

const MainCategoryTab = () => {
  const tabs = [
    {
      icon: total,
      label: '전체',
      content: <div>전체</div>,
    },
    {
      icon: popular,
      label: '인기',
      // content:
    },
    {
      icon: premium,
      label: '프리미엄',
      // content:
    },
    {
      icon: map,
      label: '지도검색',
      // content:
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorOffset, setIndicatorOffset] = useState(40);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const buttons = Array.from(containerRef.current.children) as HTMLElement[];
      const activeButton = buttons[activeIndex];

      if (activeButton) {
        // 레이아웃 계산이 완료된 후 위치값을 업데이트
        setTimeout(() => {
          setIndicatorOffset(activeButton.offsetLeft);
        }, 0);
      }
    }
  }, [activeIndex]);

  return (
    <div className='h-[7rem] w-full shadow-md'>
      <div ref={containerRef} className='relative flex items-center justify-between px-[2rem]'>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`flex h-[7rem] w-[5rem] cursor-pointer flex-col items-center justify-between py-[0.8rem] text-body3 ${
              activeIndex === index ? 'text-primary' : 'text-gray-600'
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <img src={tab.icon} alt={tab.label} className='w-[3rem]' />
            <div className=''>{tab.label}</div>
          </div>
        ))}
        <div
          className='absolute bottom-0 h-[2px] bg-primary transition-all duration-300 ease-in-out'
          style={{
            width: '5rem',
            left: `${indicatorOffset}px`,
          }}
        ></div>
      </div>
      <div className='relative overflow-hidden'>
        <div
          className='flex transition-transform duration-300 ease-in-out'
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {tabs.map((tab, index) => (
            <div key={index} className='w-full flex-shrink-0'>
              {tab.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainCategoryTab;
