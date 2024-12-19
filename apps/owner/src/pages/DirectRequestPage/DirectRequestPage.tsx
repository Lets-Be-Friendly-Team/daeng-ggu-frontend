// DirectRequestPage.tsx
import { useLocation } from 'react-router-dom';

import useGetPaymentDetails from '@/hooks/queries/Payment/useGetPaymentDetail.ts';
import useGetOwnerPetProfile from '@/hooks/queries/Request/useGetOwnerPetProfile';
import DirectStepByStep from '@/pages/DirectRequestPage/DirectStepByStep.tsx';

const DirectRequestPage = () => {
  const location = useLocation();
  const designerId = location.state?.targetDesignerId;
  console.log('this is designer Id: ', designerId);

  // Data is fetched using suspense.
  const { data: profileData } = useGetOwnerPetProfile();
  const { data: paymentDetails } = useGetPaymentDetails();

  console.log('this is paymentDetails : ', paymentDetails);

  const handleProfileSelect = (petId: number) => {
    console.log(petId);
  };

  return (
    <div className='h-full w-full'>
      <DirectStepByStep
        stepCount={9}
        profileData={profileData}
        onProfileSelect={handleProfileSelect}
        designerId={designerId} // 추가된 부분
        paymentDetails={paymentDetails} // 추가된 부분
      />
    </div>
  );
};

export default DirectRequestPage;
