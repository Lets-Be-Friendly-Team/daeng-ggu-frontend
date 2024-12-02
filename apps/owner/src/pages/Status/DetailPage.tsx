// src/pages/Bid/DetailPage.tsx

import { useLocation } from 'react-router-dom';
import { TypeOneButton } from '@daeng-ggu/design-system';

import RequestReview from '@/pages/Request/RequestReview.tsx';

const DetailPage = () => {
  const location = useLocation();
  const data = location.state?.data;

  if (!data) {
    return <div>데이터 ㄴㄴ</div>;
  }

  const selectedOptions = {
    3: data.desiredService || '정보 없음',
    4: data.lastGroomingDate || '정보 없음',
    5: data.desiredRegion || '정보 없음',
    6: [data.desiredDate1, data.desiredDate2, data.desiredDate3].filter(Boolean).join(', ') || '정보 없음',
    7: data.isVisitRequired ? '원해요' : '괜찮아요',
    8: data.isMonitoringIncluded ? '원해요' : '괜찮아요',
    9: data.additionalRequest || '정보 없음',
  };

  const processedData = {
    selectedPet: data.petId,
    selectedOptions,
    profileData: [data],
    userInput: data.specialNotes || '',
    mode: 'detail' as const,
  };

  return (
    <div>
      <div>
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
