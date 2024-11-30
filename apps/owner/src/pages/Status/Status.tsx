import { CategoryTab, Header } from '@daeng-ggu/design-system';

import CompletedRequest from '@/pages/Status/CompletedRequest';
import PendingRequest from '@/pages/Status/PendingRequest';

// https://via.placeholder.com/100

const Status = () => {
  const dummyDataForPending = [
    {
      petId: 1,
      petName: '장미',
      petImgUrl: 'https://via.placeholder.com/100',
      desiredService: '부분미용',
      isVisitRequired: true,
      createdAt: '2024-11-27T15:30:00',
      majorBreedCode: 'S',
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
      petName: '포돌이',
      petImgUrl: 'https://via.placeholder.com/100',
      desiredService: '스파',
      isVisitRequired: false,
      createdAt: '2024-11-26T10:00:00',
      majorBreedCode: 'L',
      estimateList: [
        {
          estimateId: 203,
          designerId: 303,
          designerName: '조용미용',
          designerImageUrl: 'https://via.placeholder.com/100',
          estimatePrice: 180000,
          petId: 2,
          petName: 'Milo',
          createdAt: '2024-11-26T10:30:00',
        },
        {
          estimateId: 204,
          designerId: 304,
          designerName: '시끌미용',
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
      petName: '장군이',
      petImgUrl: 'https://via.placeholder.com/100',
      desiredService: '스파',
      isVisitRequired: true,
      createdAt: '2024-11-25T09:15:00',
      majorBreedCode: 'S',
      estimateList: [
        {
          estimateId: 205,
          designerId: 305,
          designerName: '제주미용',
          designerImageUrl: 'https://via.placeholder.com/100',
          estimatePrice: 200000,
          petId: 3,
          petName: 'Bella',
          createdAt: '2024-11-25T09:45:00',
        },
        {
          estimateId: 206,
          designerId: 306,
          designerName: '경기미용',
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
        desiredService: '스파',
        isVisitRequired: false,
        createdAt: '2024-11-28T00:00:00',
        codeName: 'COMPLETED',
        majorBreedCode: 'S',
      },
      {
        requestId: 2,
        petId: 101,
        petName: '장군걸',
        petImgUrl: 'https://via.placeholder.com/100',
        desiredService: 'Grooming',
        isVisitRequired: true,
        createdAt: '2024-11-27T15:30:00',
        codeName: 'FAILED',
        majorBreedCode: 'S',
      },
      {
        requestId: 3,
        petId: 102,
        petName: '밀난',
        petImgUrl: 'https://via.placeholder.com/100',
        desiredService: '부분미용',
        isVisitRequired: false,
        createdAt: '2024-11-26T10:00:00',
        codeName: 'COMPLETED',
        majorBreedCode: 'S',
      },
      {
        requestId: 4,
        petId: 103,
        petName: '부모미',
        petImgUrl: 'https://via.placeholder.com/100',
        desiredService: '전체미용',
        isVisitRequired: true,
        createdAt: '2024-11-25T09:15:00',
        codeName: 'COMPLETED',
        majorBreedCode: 'S',
      },
      {
        requestId: 5,
        petId: 102,
        petName: '밀난',
        petImgUrl: 'https://via.placeholder.com/100',
        desiredService: '부분미용',
        isVisitRequired: false,
        createdAt: '2024-11-26T10:00:00',
        codeName: 'COMPLETED',
        majorBreedCode: 'S',
      },
      {
        requestId: 6,
        petId: 102,
        petName: '밀난',
        petImgUrl: 'https://via.placeholder.com/100',
        desiredService: '부분미용',
        isVisitRequired: false,
        createdAt: '2024-11-26T10:00:00',
        codeName: 'COMPLETED',
        majorBreedCode: 'S',
      },
      {
        requestId: 7,
        petId: 102,
        petName: '밀난',
        petImgUrl: 'https://via.placeholder.com/100',
        desiredService: '부분미용',
        isVisitRequired: false,
        createdAt: '2024-11-26T10:00:00',
        codeName: 'COMPLETED',
        majorBreedCode: 'S',
      },
      {
        requestId: 8,
        petId: 102,
        petName: '밀난',
        petImgUrl: 'https://via.placeholder.com/100',
        desiredService: '부분미용',
        isVisitRequired: false,
        createdAt: '2024-11-26T10:00:00',
        codeName: 'COMPLETED',
        majorBreedCode: 'S',
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
