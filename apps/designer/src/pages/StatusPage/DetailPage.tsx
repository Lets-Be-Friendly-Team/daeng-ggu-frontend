// src/pages/Bid/DetailPage.tsx

import { useLocation, useNavigate } from 'react-router-dom';
import { Header, PageContainer, TypeOneButton } from '@daeng-ggu/design-system';
import { ProfileData } from '@daeng-ggu/owner/src/types/requestAndStatusTypes.ts';

import RequestReview from '@/pages/RequestPage/RequestReview';

export interface DesignerProcessedData {
  selectedPet: number;
  selectedOptions: { [key: number]: string };
  profileData: ProfileData[]; // Using ProfileData directly
  userInput: string;
  mode: 'detail';
}

export type PageMode = 'designer';
export interface ReservationProcessedData {
  selectedPet: number;
  selectedOptions: { [key: number]: string };
  profileData: ProfileData[]; // Using ProfileData directly
  userInput: string;
  mode: 'detail';
}
export interface UserProcessedData {
  selectedPet: number;
  selectedOptions: { [key: number]: string };
  profileData: ProfileData[];
  userInput: string;
  mode: 'detail';
}

const DetailPage = (customerId: number) => {
  const location = useLocation();
  const data = location.state?.data;
  const pageMode: PageMode = 'designer';
  const navigate = useNavigate();
  console.log(pageMode);

  const tempDataDesigner = {
    petId: { customerId },
    petName: '견적요청맨',
    petImageUrl: 'https://via.placeholder.com/100',
    desiredServiceCode: '부분미용',
    lastGroomingDate: '한달전',
    desiredDate1: '2024-12-15T10:00:00',
    desiredDate2: '2024-12-16T14:00:00',
    desiredDate3: '2024-12-17T09:00:00',
    desiredRegion: '서울, 강남구',
    isVisitRequired: true,
    isMonitoringIncluded: true,
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

  const tempDataReservation = {};

  const selectedData = pageMode === 'designer' ? tempDataDesigner : data || tempDataReservation;

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
    pageMode === 'designer'
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

  const headerTitle = pageMode === 'designer' ? '견적요청서 상세보기 (디자이너)' : '예약 상세보기';

  const buttonText = pageMode === 'designer' ? '견적 제안하기' : '예약 취소';
  return (
    <div>
      <PageContainer>
        <div className='mb-6 w-full'>
          <Header
            mode='customBack'
            title={headerTitle}
            onClick={() => {
              window.history.back();
            }}
          />
        </div>
      </PageContainer>
      <RequestReview {...processedData} pageMode={pageMode} />
      <div className='fixed w-full' style={{ bottom: '64px' }}>
        <TypeOneButton
          text={buttonText}
          onClick={() => {
            if (pageMode === 'designer') {
              navigate('/bid/suggest', {
                state: {
                  petId: selectedData.petId,
                  customerName: selectedData.customerName,
                  desiredDateOne: selectedData.desiredDate1,
                  desiredDateTwo: selectedData.desiredDate2,
                  desiredDateThree: selectedData.desiredDate3,
                  address: selectedData.address,
                  phone: selectedData.phone,
                  majorBreed: selectedData.majorBreed,
                  desiredServiceCode: selectedData.desiredServiceCode,
                  isVisitRequired: selectedData.isVisitRequired,
                  isMonitoringIncluded: selectedData.isMonitoringIncluded,
                },
              });
            }
          }}
          color='bg-secondary'
        />
      </div>
    </div>
  );
};

export default DetailPage;
