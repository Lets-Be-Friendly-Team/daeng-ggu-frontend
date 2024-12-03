// src/pages/Bid/DetailPage.tsx

import { useLocation } from 'react-router-dom';
import { Header, TypeOneButton } from '@daeng-ggu/design-system';

import RequestReview from '@/pages/Request/RequestReview.tsx';

const DetailPage = () => {
  const location = useLocation();
  const data = location.state?.data;

  const tempData = {
    petId: 1,
    petName: '장장장',
    petImgUrl: 'https://via.placeholder.com/100',
    desiredService: '부분미용',
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
  };

  const selectedData = data || tempData;

  const selectedOptions = {
    3: selectedData.desiredService || '정보 없음',
    4: selectedData.lastGroomingDate || '정보 없음',
    5: selectedData.desiredRegion || '정보 없음',
    6:
      [selectedData.desiredDate1, selectedData.desiredDate2, selectedData.desiredDate3].filter(Boolean).join(', ') ||
      '정보 없음',
    7: selectedData.isVisitRequired ? '원해요' : '괜찮아요',
    8: selectedData.isMonitoringIncluded ? '원해요' : '괜찮아요',
    9: selectedData.additionalRequest || '정보 없음',
  };

  const processedData = {
    selectedPet: selectedData.petId,
    selectedOptions,
    profileData: [selectedData],
    userInput: selectedData.specialNotes || '',
    mode: 'detail' as const,
  };

  return (
    <div>
      <div className='mb-6 max-w-[480px]'>
        <Header mode='back' title='견적요청서 상세보기' onClick={() => {}} />
      </div>
      <div className='px-[20px]'>
        <RequestReview {...processedData} />
      </div>
      <div className='button-container fixed w-full' style={{ bottom: '65px' }}>
        <div className='relative'>
          <TypeOneButton text={'예약하기'} onClick={() => {}} color='bg-secondary' />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
