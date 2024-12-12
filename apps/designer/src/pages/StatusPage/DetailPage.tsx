// src/pages/Bid/DetailPage.tsx
import { useLocation, useNavigate } from 'react-router-dom';
import { Header, PageContainer, TypeOneButton } from '@daeng-ggu/design-system';

import usePostDetailPage from '@/hooks/queries/Request/usePostDetailPage';
import RequestReview from '@/pages/RequestPage/RequestReview';

export interface ProfileData {
  petId: number;
  petName: string;
  petImageUrl: string;
  petImgName: string;
  birthDate: string;
  gender: string;
  isNeutered: boolean;
  weight: number;
  majorBreedCode: string;
  majorBreed: string;
  subBreedCode: string;
  subBreed: string;
  specialNotes?: string;
  isRequested: boolean;
  customerName: string;
  phone: string;
  address: string;
  desiredServiceCode?: string;
}

export interface DesignerProcessedData {
  selectedPet: number;
  selectedOptions: { [key: number]: string };
  profileData: ProfileData[];
  userInput: string;
  mode: 'detail';
}

export type PageMode = 'designer';

const DetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pageMode: PageMode = 'designer';

  const customerId = location.state?.customerId;
  console.log('CustomerId:', customerId);

  // Using the query hook with suspense
  const { data: postData } = usePostDetailPage({ requestId: customerId ? Number(customerId) : undefined });

  console.log('so... what is this?: ', postData);
  // By this point, since we're using suspense, we know `postData` is loaded
  // Convert 'Y'/'N' to boolean for isNeutered
  const isNeuteredBoolean = postData.isNeutered === 'Y';

  const profile: ProfileData = {
    petId: postData.petId,
    petName: postData.petName,
    petImageUrl: postData.petImageUrl,
    petImgName: postData.petImageName,
    birthDate: postData.birthDate,
    gender: postData.gender,
    isNeutered: isNeuteredBoolean,
    weight: postData.weight,
    majorBreedCode: postData.majorBreedCode,
    majorBreed: postData.majorBreed,
    subBreedCode: postData.subBreedCode,
    subBreed: postData.subBreed,
    specialNotes: postData.specialNotes,
    isRequested: postData.isRequested,
    customerName: postData.customerName,
    phone: postData.phone,
    address: postData.address,
    desiredServiceCode: postData.desiredServiceCode,
  };

  const lastGroomingDate = postData.lastGroomingDate || '정보 없음';
  const desiredDate1 = postData.desiredDate1 || '';
  const desiredDate2 = postData.desiredDate2 || '';
  const desiredDate3 = postData.desiredDate2 || '';
  const desiredRegion = postData.desiredRegion || '정보 없음';
  const additionalRequest = postData.additionalRequest || '정보 없음';
  const isVisitRequired = postData.isVisitRequired ?? false;
  const isMonitoringIncluded = postData.isMonitoringIncluded ?? false;

  const getSelectedOptions = (): { [key: number]: string } => {
    return {
      3: profile.desiredServiceCode || '정보 없음',
      4: lastGroomingDate,
      5: desiredRegion,
      6: [desiredDate1, desiredDate2, desiredDate3].filter(Boolean).join(', ') || '정보 없음',
      7: isVisitRequired ? '원해요' : '괜찮아요',
      8: isMonitoringIncluded ? '원해요' : '괜찮아요',
      9: additionalRequest,
    };
  };

  const processedData: DesignerProcessedData = {
    selectedPet: profile.petId,
    selectedOptions: getSelectedOptions(),
    profileData: [profile],
    userInput: profile.specialNotes || '',
    mode: 'detail',
  };

  const headerTitle = '견적요청서 상세보기 (디자이너)';
  const buttonText = '견적 제안하기';

  console.log('lets check this: ', profile);

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
            navigate('/bid/suggest', {
              state: {
                petId: profile.petId,
                customerName: profile.customerName,
                desiredDateOne: desiredDate1,
                desiredDateTwo: desiredDate2,
                desiredDateThree: desiredDate3,
                address: profile.address,
                phone: profile.phone,
                majorBreed: profile.majorBreed,
                desiredServiceCode: profile.desiredServiceCode,
                isVisitRequired,
                isMonitoringIncluded,
              },
            });
          }}
          color='bg-secondary'
        />
      </div>
    </div>
  );
};

export default DetailPage;
