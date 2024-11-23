import { useEffect, useRef, useState } from 'react';

interface ITab {
  label: string;
  onClick: () => void;
}
interface ITabProps {
  tabs: ITab[];
  activeIndex: number;
}

const CategoryTab = ({ tabs, activeIndex }: ITabProps) => {
  const [indicatorOffset, setIndicatorOffset] = useState(0); // 하단 border 위치
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const buttons = containerRef.current.children; // 버튼 요소 가져오기
      if (buttons[activeIndex]) {
        const button = buttons[activeIndex] as HTMLElement;
        setIndicatorOffset(button.offsetLeft); // 활성화된 버튼의 x 위치
      }
    }
  }, [activeIndex]);

  return (
    <div className='flex h-[60px] flex-col justify-center'>
      <div ref={containerRef} className='relative flex justify-between px-[40px] align-middle'>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`flex h-[33px] w-[80px] justify-center py-[8px] text-sub_h2 ${
              activeIndex === index ? 'text-primary' : 'text-gray-300'
            }`}
            onClick={tab.onClick}
          >
            {tab.label}
          </div>
        ))}

        <div
          className='absolute bottom-0 h-[2px] bg-primary transition-all duration-300 ease-in-out'
          style={{
            width: '80px',
            left: `${indicatorOffset}px`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default CategoryTab;
