// src/pages/Bid/DetailPage.tsx

import { useLocation } from 'react-router-dom';
import { Header, TypeOneButton } from '@daeng-ggu/design-system';

import RequestReview from '@/pages/Request/RequestReview.tsx';
import {
  DesignerProcessedData,
  PageMode,
  ReservationProcessedData,
  UserProcessedData,
} from '@/requestAndStatusTypes.ts'; // Adjust the import path as needed

const DetailPage = () => {
  const location = useLocation();
  const data = location.state?.data;
  const pageMode: PageMode = location.state?.pageMode || 'user'; // Default to 'user' if not specified

  // Temporary data for demonstration purposes
  const tempDataUser = {
    petId: 1,
    petName: '이전견적맨',
    petImgUrl: 'https://via.placeholder.com/100',
    desiredServiceCode: '부분미용', // Changed from desiredService to desiredServiceCode
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

  const tempDataDesigner = {
    petId: 1,
    petName: '견적요청맨',
    petImgUrl: 'https://via.placeholder.com/100',
    desiredServiceCode: '부분미용', // Already using desiredServiceCode
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

  const tempDataReservation = {
    // Define temporary data for reservation mode when implemented
  };

  const selectedData =
    pageMode === 'user'
      ? data || tempDataUser
      : pageMode === 'designer'
        ? data || tempDataDesigner
        : data || tempDataReservation;

  /**
   * Modified getSelectedOptions to handle different page modes.
   * Now always uses desiredServiceCode.
   */
  const getSelectedOptions = (): { [key: number]: string } => {
    return {
      3: selectedData.desiredServiceCode || '정보 없음',
      4: selectedData.lastGroomingDate || '정보 없음',
      5: selectedData.desiredRegion || '정보 없음',
      6:
        [selectedData.desiredDate1, selectedData.desiredDate2, selectedData.desiredDate3].filter(Boolean).join(', ') ||
        '정보 없음',
      7: selectedData.isVisitRequired ? '원해요' : '괜찮아요',
      8: selectedData.isMonitoringIncluded ? '원해요' : '괜찮아요',
      9: selectedData.additionalRequest || '정보 없음',
    };
  };

  const processedData =
    pageMode === 'user'
      ? ({
          selectedPet: selectedData.petId,
          selectedOptions: getSelectedOptions(),
          profileData: [selectedData],
          userInput: selectedData.specialNotes || '',
          mode: 'detail',
        } as UserProcessedData)
      : pageMode === 'designer'
        ? ({
            selectedPet: selectedData.petId,
            selectedOptions: getSelectedOptions(),
            profileData: [selectedData],
            userInput: selectedData.specialNotes || '',
            mode: 'detail',
          } as DesignerProcessedData)
        : ({
            selectedPet: selectedData.petId,
            selectedOptions: {},
            profileData: [selectedData],
            userInput: '',
            mode: 'detail',
          } as ReservationProcessedData);

  const headerTitle =
    pageMode === 'user'
      ? '견적요청서 상세보기'
      : pageMode === 'designer'
        ? '견적요청서 상세보기 (디자이너)'
        : '예약 상세보기';

  const buttonText = pageMode === 'user' ? '예약하기' : pageMode === 'designer' ? '견적 제안하기' : '예약 취소';
  return (
    <div>
      <div className='mb-6 max-w-[480px]'>
        <Header
          mode='back'
          title={headerTitle}
          onClick={() => {
            window.history.back();
          }}
        />
      </div>

      <div className='px-[20px]'>
        <RequestReview {...processedData} pageMode={pageMode} />
      </div>

      <div className='button-container fixed w-full' style={{ bottom: '65px' }}>
        <div className='relative flex justify-center'>
          <TypeOneButton
            text={buttonText}
            onClick={() => {
              if (pageMode === 'user') {
                // navigate('/booking', { state: { petId: selectedData.petId } });
                console.log('예약하기 버튼 클릭');
              } else if (pageMode === 'designer') {
                // navigate('/booking', { state: { petId: selectedData.petId } });
              } else if (pageMode === 'reservation') {
                console.log('예약 취소 버튼 클릭');
              }
            }}
            color='bg-secondary'
          />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;