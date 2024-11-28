import React, { useEffect, useRef, useState } from 'react';

interface ITab {
  label: string;
  content: React.ReactNode;
}

interface CategoryTabProps {
  tabs: ITab[];
}

const CategoryTab: React.FC<CategoryTabProps> = ({ tabs }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorOffset, setIndicatorOffset] = useState(0); // Position of the bottom border indicator
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const buttons = containerRef.current.children;
      const buttonElements = Array.from(buttons) as HTMLElement[];

      if (buttonElements[activeIndex]) {
        const button = buttonElements[activeIndex];
        setIndicatorOffset(button.offsetLeft);
      }
    }
  }, [activeIndex]);

  return (
    <div>
      <div className='flex h-[60px] flex-col justify-center'>
        <div ref={containerRef} className='relative flex justify-between px-[40px] align-middle'>
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`flex h-[33px] w-[80px] justify-center py-[8px] cursor-pointer text-sub_h2 ${
                activeIndex === index ? 'text-primary' : 'text-gray-300'
              }`}
              onClick={() => setActiveIndex(index)}
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

      {/* Content Rendering */}
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
