import { useLocation } from 'react-router-dom';
import { CategoryTab, Header } from '@daeng-ggu/design-system';

import CompletedRequest from '@/pages/Status/CompletedRequest';
import PendingRequest from '@/pages/Status/PendingRequest';
import { PageMode } from '@/types/requestAndStatusTypes';

// https://via.placeholder.com/100

const Status = () => {
  const location = useLocation();
  const fromPath = location.state?.from;

  let mode: PageMode = 'user';

  switch (fromPath) {
    case '/bid/designer':
      mode = 'designer';
      break;
    case '/bid/reservation':
      mode = 'reservation';
      break;
    default:
      mode = 'user';
  }

  const dummyDataForDesigner = [
    {
      requestId: 1,
      petId: 1,
      petName: '장미',
      petImageUrl: 'https://via.placeholder.com/100',
      desiredServiceCode: '부분미용',
      isVisitRequired: true,
      createdAt: '2024-12-02T10:30:00',
    },
    {
      requestId: 2,
      petId: 2,
      petName: '포돌',
      petImageUrl: 'https://via.placeholder.com/100',
      desiredServiceCode: '스파',
      isVisitRequired: true,
      createdAt: '2024-12-02T10:30:00',
    },
  ];

  const dummyDataForDesignerCompleted = {
    requestList: [
      {
        petId: 1,
        petName: '장미',
        petImgUrl: 'https://via.placeholder.com/100',
        desiredServiceCode: '부분미용',
        lastGroomingDate: '한달전',
        desiredDate1: '2023-10-15T10:00:00',
        desiredDate2: '2023-10-16T14:00:00',
        desiredDate3: '2023-10-17T09:00:00',
        desiredRegion: '서울, 강남구',
        isVisitRequired: true,
        isMonitoringIncluded: false,
        additionalRequest: '잘 물어요',
      },
      {
        petId: 2,
        petName: '장군',
        petImgUrl: 'https://via.placeholder.com/100',
        desiredServiceCode: '잔체미용',
        lastGroomingDate: '한달전',
        desiredDate1: '2023-10-15T10:00:00',
        desiredDate2: '2023-10-16T14:00:00',
        desiredDate3: '2023-10-17T09:00:00',
        desiredRegion: '서울, 강남구',
        isVisitRequired: true,
        isMonitoringIncluded: false,
        additionalRequest: '잘 물다 말아요',
      },
    ],
  };

  const dummyDataForPending = [
    {
      petId: 1,
      petName: '장미',
      petImgUrl: 'https://via.placeholder.com/100',
      desiredServiceCode: '부분미용',
      lastGroomingDate: '한달전',
      desiredDate1: '2023-10-15T10:00:00',
      desiredDate2: '2023-10-16T14:00:00',
      desiredDate3: '2023-10-17T09:00:00',
      desiredRegion: '서울, 강남구',
      isVisitRequired: true,
      isMonitoringIncluded: false,
      additionalRequest: '잘 물어요',
      createdAt: '2024-11-27T15:30:00',
      majorBreedCode: 'S',
      subBreed: 'Podolski',
      birthDate: '2018-01-15',
      gender: 'male',
      isNeutered: true,
      weight: 68,
      majorBreed: '대형견',
      specialNotes: '활발하며 사교성이 좋습니다.',
      isRequested: true,
      customerName: '김철수',
      phone: '010-1234-5678',
      address: '서울시 강남구 테헤란로 123 포돌빌딩 1304호',
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
      desiredServiceCode: '스파',
      lastGroomingDate: '두달전',
      desiredDate1: '2023-10-15T10:00:00',
      desiredDate2: '2023-10-16T14:00:00',
      desiredDate3: '2023-10-17T09:00:00',
      desiredRegion: '서울, 강남구',
      isVisitRequired: true,
      isMonitoringIncluded: false,
      additionalRequest: '잘 물어요',
      createdAt: '2024-11-26T10:00:00',
      majorBreedCode: 'L',
      subBreed: 'Labrador',
      birthDate: '2020-06-15',
      gender: 'female',
      isNeutered: true,
      weight: 30,
      majorBreed: '대형견',
      specialNotes: '친근하며 어린아이들과 잘 어울립니다.',
      isRequested: true,
      customerName: '이민지',
      phone: '010-8765-4321',
      address: '서울시 마포구 월드컵북로 10-20',
      estimateList: [
        {
          estimateId: 203,
          designerId: 303,
          designerName: '조용미용',
          designerImageUrl: 'https://via.placeholder.com/100',
          estimatePrice: 180000,
          petId: 2,
          petName: '포돌이',
          createdAt: '2024-11-26T10:30:00',
        },
        {
          estimateId: 204,
          designerId: 304,
          designerName: '시끌미용',
          designerImageUrl: 'https://via.placeholder.com/100',
          estimatePrice: 170000,
          petId: 2,
          petName: '포돌이',
          createdAt: '2024-11-26T11:00:00',
        },
      ],
    },
    {
      petId: 3,
      petName: '장군이',
      petImgUrl: 'https://via.placeholder.com/100',
      desiredServiceCode: '전체미용',
      lastGroomingDate: '한달전',
      desiredDate1: '2023-10-15T10:00:00',
      desiredDate2: '2023-10-16T14:00:00',
      desiredDate3: '2023-10-17T09:00:00',
      desiredRegion: '서울, 동대문구',
      isVisitRequired: true,
      isMonitoringIncluded: false,
      additionalRequest: '안 물어요',
      createdAt: '2024-11-25T09:15:00',
      majorBreedCode: 'S',
      subBreed: 'Shiba Inu',
      birthDate: '2021-03-10',
      gender: 'male',
      isNeutered: false,
      weight: 12,
      majorBreed: '중형견',
      specialNotes: '독립적이며 주인을 잘 따릅니다.',
      isRequested: true,
      customerName: '최지훈',
      phone: '010-1122-3344',
      address: '인천광역시 부평구 부평대로 55',
      estimateList: [
        {
          estimateId: 205,
          designerId: 305,
          designerName: '제주미용',
          designerImageUrl: 'https://via.placeholder.com/100',
          estimatePrice: 200000,
          petId: 3,
          petName: '장군이',
          createdAt: '2024-11-25T09:45:00',
        },
        {
          estimateId: 206,
          designerId: 306,
          designerName: '경기미용',
          designerImageUrl: 'https://via.placeholder.com/100',
          estimatePrice: 210000,
          petId: 3,
          petName: '장군이',
          createdAt: '2024-11-25T10:00:00',
        },
      ],
    },
    {
      petId: 4,
      petName: '뽀삐',
      petImgUrl: 'https://via.placeholder.com/100',
      desiredServiceCode: '전체미용',
      lastGroomingDate: '세달전',
      desiredDate1: '2023-10-15T10:00:00',
      desiredDate2: '2023-10-16T14:00:00',
      desiredDate3: '2023-10-17T09:00:00',
      desiredRegion: '서울, 동작구',
      isVisitRequired: true,
      isMonitoringIncluded: false,
      additionalRequest: '잘 못 물어요',
      createdAt: '2024-11-28T14:45:00',
      majorBreedCode: 'M',
      subBreed: 'Beagle',
      birthDate: '2019-05-20',
      gender: 'female',
      isNeutered: false,
      weight: 25,
      majorBreed: '중형견',
      specialNotes: '수줍음이 많고 낮선 사람을 경계합니다.',
      isRequested: false,
      customerName: '박영희',
      phone: '010-9876-5432',
      address: '부산광역시 해운대구 달맞이길 54 202호',
      estimateList: [
        {
          estimateId: 301,
          designerId: 401,
          designerName: 'Charlie',
          designerImageUrl: 'https://via.placeholder.com/100',
          estimatePrice: 120000,
          petId: 4,
          petName: '뽀삐',
          createdAt: '2024-11-28T15:00:00',
        },
        {
          estimateId: 302,
          designerId: 402,
          designerName: 'Diana',
          designerImageUrl: 'https://via.placeholder.com/100',
          estimatePrice: 130000,
          petId: 4,
          petName: '뽀삐',
          createdAt: '2024-11-28T15:30:00',
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
        desiredServiceCode: '스파',
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
        desiredServiceCode: 'Grooming',
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
        desiredServiceCode: '부분미용',
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
        desiredServiceCode: '전체미용',
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
        desiredServiceCode: '부분미용',
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
        desiredServiceCode: '부분미용',
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
        desiredServiceCode: '부분미용',
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
        desiredServiceCode: '부분미용',
        isVisitRequired: false,
        createdAt: '2024-11-26T10:00:00',
        codeName: 'COMPLETED',
        majorBreedCode: 'S',
      },
    ],
  };
  const getDataByMode = (mode: PageMode) => {
    switch (mode) {
      case 'designer':
        return dummyDataForDesigner;
      case 'user':
        return dummyDataForPending;
      case 'reservation':
        return [];
      default:
        return [];
    }
  };

  const getCompletedDataByMode = (mode: PageMode) => {
    switch (mode) {
      case 'designer':
        return dummyDataForDesignerCompleted;
      case 'user':
      case 'reservation':
        return dummyDataForCompleted;
      default:
        return { requestList: [] };
    }
  };

  const tabs = [
    {
      label: mode === 'designer' ? '견적요청 목록' : mode === 'reservation' ? '예약 목록' : '견적서받는 중',
      content: <PendingRequest data={getDataByMode(mode)} mode={mode} />,
    },
    {
      label: '이전견적 조회',
      content: <CompletedRequest data={getCompletedDataByMode(mode)} mode={mode} />,
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
