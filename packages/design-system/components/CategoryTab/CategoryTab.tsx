import React, { useEffect, useRef, useState } from 'react';

import { cn } from '../../lib/utils';

interface ITab {
  label: string;
  content: React.ReactNode;
}

interface CategoryTabProps {
  tabs: ITab[];
  fontSize?: string;
  padding?: string;
}

/*
* 카테고리 이제 차일드로 가지고 있는 컴포넌트에 대해서 스타일 같이 적용됨
* 그냥 라벨하고 컴포넌트 추가
* 근데 변수명 왜 ITab?
* 적용 예시
* interface LocationState {
  from?: string;
}

const Status = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tabs = [
    {
      label: '완료된 견적',
      content: <CompletedRequest />,
    },
    {
      label: '요청중인 견적',
      content: <PendingRequest />,
    },
  ];

  return (
    <div className='h-full max-w-[480px]'>
      <div className='max-w-[480px]'>
        <Header mode='main' title='견적 조회하기' />
        <CategoryTab tabs={tabs} />
      </div>
    </div>
  );
};
**/

const CategoryTab = ({ tabs, fontSize, padding }: CategoryTabProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyles, setIndicatorStyles] = useState({ left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const buttons = containerRef.current.children;
      const buttonElements = Array.from(buttons) as HTMLElement[];

      if (buttonElements[activeIndex]) {
        const button = buttonElements[activeIndex];
        setIndicatorStyles({
          left: button.offsetLeft,
          width: button.offsetWidth,
        });
      }
    }
  }, [activeIndex]);

  return (
    <div>
      <div className='flex h-[60px] flex-col justify-center'>
        <div ref={containerRef} className={cn('relative flex justify-between px-[40px] align-middle', padding)}>
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`flex h-[33px] cursor-pointer justify-center py-[8px] ${fontSize ? fontSize : 'text-sub_h2'} ${
                activeIndex === index ? 'text-primary' : 'text-gray-600'
              }`}
              onClick={() => setActiveIndex(index)}
            >
              {tab.label}
            </div>
          ))}

          <div
            className='absolute bottom-0 h-[2px] bg-primary transition-all duration-300 ease-in-out'
            style={{
              width: `${indicatorStyles.width}px`,
              left: `${indicatorStyles.left}px`,
            }}
          ></div>
        </div>
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

export default CategoryTab;
