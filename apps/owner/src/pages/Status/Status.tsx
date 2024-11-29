import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CategoryTab, Header } from '@daeng-ggu/design-system';

import CompletedRequest from '@/pages/Status/CompletedRequest';
import PendingRequest from '@/pages/Status/PendingRequest';

interface LocationState {
  from?: string;
}

// https://via.placeholder.com/100

const Status = () => {
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

  const dummyDataForPending = [
    {
      petId: 1,
      petName: 'Buddy',
      petImgUrl: 'https://via.placeholder.com/100',
      desiredService: 'Grooming',
      isVisitRequired: true,
      createdAt: '2024-11-27T15:30:00',
      estimateList: [
        // {
        //   estimateId: 1,
        //   designerId: 3,
        //   designerName: 'Alice',
        //   designerImageUrl: 'https://via.placeholder.com/100',
        //   estimatePrice: 150000,
        //   petId: 1,
        //   petName: 'Buddy',
        //   createdAt: '2024-11-27T16:00:00',
        // },
        // {
        //   estimateId: 2,
        //   designerId: 32,
        //   designerName: 'Bob',
        //   designerImageUrl: 'https://via.placeholder.com/100',
        //   estimatePrice: 140000,
        //   petId: 1,
        //   petName: 'Buddy',
        //   createdAt: '2024-11-27T16:15:00',
        // },
      ],
    },
    {
      petId: 2,
      petName: 'Milo',
      petImgUrl: 'https://via.placeholder.com/100',
      desiredService: 'Training',
      isVisitRequired: false,
      createdAt: '2024-11-26T10:00:00',
      estimateList: [
        {
          estimateId: 203,
          designerId: 303,
          designerName: 'Sophia',
          designerImageUrl: 'https://via.placeholder.com/100',
          estimatePrice: 180000,
          petId: 2,
          petName: 'Milo',
          createdAt: '2024-11-26T10:30:00',
        },
        {
          estimateId: 204,
          designerId: 304,
          designerName: 'John',
          designerImageUrl: 'https://via.placeholder.com/100',
          estimatePrice: 170000,
          petId: 2,
          petName: 'Milo',
          createdAt: '2024-11-26T11:00:00',
        },
      ],
    },
    {
      petId: 3,
      petName: 'Bella',
      petImgUrl: 'https://via.placeholder.com/100',
      desiredService: 'Vet Checkup',
      isVisitRequired: true,
      createdAt: '2024-11-25T09:15:00',
      estimateList: [
        {
          estimateId: 205,
          designerId: 305,
          designerName: 'Emily',
          designerImageUrl: 'https://via.placeholder.com/100',
          estimatePrice: 200000,
          petId: 3,
          petName: 'Bella',
          createdAt: '2024-11-25T09:45:00',
        },
        {
          estimateId: 206,
          designerId: 306,
          designerName: 'James',
          designerImageUrl: 'https://via.placeholder.com/100',
          estimatePrice: 210000,
          petId: 3,
          petName: 'Bella',
          createdAt: '2024-11-25T10:00:00',
        },
      ],
    },
  ];

  const dummyDataForCompleted = {
    requestList: [
      {
        requestId: 1,
        petId: 0,
        petName: '장군맨',
        petImgUrl: 'https://via.placeholder.com/100',
        desiredService: '',
        isVisitRequired: false,
        createdAt: '2024-11-28T00:00:00', // Corrected property name
      },
      {
        requestId: 2,
        petId: 101,
        petName: 'Buddy',
        petImgUrl: 'https://via.placeholder.com/100',
        desiredService: 'Grooming',
        isVisitRequired: true,
        createdAt: '2024-11-27T15:30:00', // Corrected property name
      },
      {
        requestId: 3,
        petId: 102,
        petName: 'Milo',
        petImgUrl: 'https://via.placeholder.com/100',
        desiredService: 'Training',
        isVisitRequired: false,
        createdAt: '2024-11-26T10:00:00', // Corrected property name
      },
      {
        requestId: 4,
        petId: 103,
        petName: 'Bella',
        petImgUrl: 'https://via.placeholder.com/100',
        desiredService: 'Vet Checkup',
        isVisitRequired: true,
        createdAt: '2024-11-25T09:15:00', // Corrected property name
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
