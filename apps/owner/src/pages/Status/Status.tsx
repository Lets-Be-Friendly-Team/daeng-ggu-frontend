import React, { useEffect } from 'react';
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

  useEffect(() => {
    const previousPath = state?.from || '';

    if (previousPath !== '/test') {
      alert(`ㄴㄴ ${previousPath || 'unknown'}`);
      setTimeout(() => navigate('/', { replace: true }), 0);
    }
  }, [state, navigate]);

  const dummyDataForPending = {
    petId: 0,
    desiredService: '',
    isVisitRequired: false,
    createdAt: '2024-11-28T00:00:00',
    petList: [
      {
        petId: 0,
        petName: '',
        petImgUrl: 'https://via.placeholder.com/100',
      },
      {
        petId: 1,
        petName: '',
        petImgUrl: 'https://via.placeholder.com/100',
      },
    ],
    estimateList: [
      {
        estimateId: 1,
        designerId: 0,
        designerName: '포돌맨',
        designerImageUrl: 'https://via.placeholder.com/100',
        estimatePrice: 0,
        petId: 0,
        petName: '',
        createdAt: '2024-11-28T00:00:00',
      },
      {
        estimateId: 2,
        designerId: 101,
        designerName: 'Alice',
        designerImageUrl: 'https://via.placeholder.com/100',
        estimatePrice: 150000,
        petId: 101,
        petName: 'Buddy',
        createdAt: '2024-11-27T14:30:00',
      },
      {
        estimateId: 3,
        designerId: 102,
        designerName: 'John',
        designerImageUrl: 'https://via.placeholder.com/100',
        estimatePrice: 120000,
        petId: 102,
        petName: 'Milo',
        createdAt: '2024-11-26T11:00:00',
      },
      {
        estimateId: 4,
        designerId: 103,
        designerName: 'Sophia',
        designerImageUrl: 'https://via.placeholder.com/100',
        estimatePrice: 180000,
        petId: 103,
        petName: 'Bella',
        createdAt: '2024-11-25T09:45:00',
      },
    ],
  };


  const dummyDataForCompleted = {
    requestList: [
      {
        requestId: 1,
        petId: 0,
        petName: '장군맨',
        petImgUrl: 'https://via.placeholder.com/100',
        desiredService: '',
        isVisitRequired: false,
        created_at: '2024-11-28T00:00:00',
      },
      {
        requestId: 2,
        petId: 101,
        petName: 'Buddy',
        petImgUrl: 'https://via.placeholder.com/100',
        desiredService: 'Grooming',
        isVisitRequired: true,
        created_at: '2024-11-27T15:30:00',
      },
      {
        requestId: 3,
        petId: 102,
        petName: 'Milo',
        petImgUrl: 'https://via.placeholder.com/100',
        desiredService: 'Training',
        isVisitRequired: false,
        created_at: '2024-11-26T10:00:00',
      },
      {
        requestId: 4,
        petId: 103,
        petName: 'Bella',
        petImgUrl: 'https://via.placeholder.com/100',
        desiredService: 'Vet Checkup',
        isVisitRequired: true,
        created_at: '2024-11-25T09:15:00',
      },
    ],
  };


  const tabs = [
    {
      label: '견적서받는 중',
      content: <PendingRequest data={dummyDataForPending} />,
    },
    {
      label: '이전견적 조회',
      content: <CompletedRequest data={dummyDataForCompleted} />,
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

export default Status;
