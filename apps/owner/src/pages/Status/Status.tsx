import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header, CategoryTab } from '@daeng-ggu/design-system';
import CompletedRequest from '@/pages/Status/CompletedRequest';
import PendingRequest from '@/pages/Status/PendingRequest';

interface LocationState {
  from?: string;
}

const Status: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | undefined;

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const tabs = [
    {
      label: '완료된 견적',
      onClick: () => setActiveIndex(0),
    },
    {
      label: '요청중인 견적',
      onClick: () => setActiveIndex(1),
    },
  ];

  useEffect(() => {
    const previousPath = state?.from || '';

    if (previousPath !== '/test') {
      alert(`ㄴㄴ ${previousPath || 'unknown'}`);
      setTimeout(() => navigate('/', { replace: true }), 0);
    }
  }, [state, navigate]);

  return (
    <div className='h-full max-w-[480px]'>
      <div className='max-w-[480px]'>
        <Header mode='main' title='견적 조회하기' onClick={() => {}} />
        <CategoryTab tabs={tabs} activeIndex={activeIndex} />

        {/* Content Container */}
        <div className='relative overflow-hidden'>
          <div
            className='flex transition-transform duration-300 ease-in-out'
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            <div className='w-full flex-shrink-0'>
              <CompletedRequest />
            </div>
            <div className='w-full flex-shrink-0'>
              <PendingRequest />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;
