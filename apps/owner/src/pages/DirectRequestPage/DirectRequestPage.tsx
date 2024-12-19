import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import useGetOwnerPetProfile from '@/hooks/queries/Request/useGetOwnerPetProfile';
import StepByStep from '@/pages/Request/StepByStep';

const DirectRequestPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data: profileData } = useGetOwnerPetProfile();
  useEffect(() => {
    const previousPath = location.state?.from || '';
    if (previousPath !== '/bid') {
      alert(`ㄴㄴ ${previousPath || 'unknown'}`);
      setTimeout(() => navigate('/', { replace: true }), 0);
    }
  }, [location, navigate]);

  const handleProfileSelect = (petId: number) => {
    console.log(petId);
  };

  return (
    <div className='h-full w-full'>
      {profileData && <StepByStep stepCount={10} profileData={profileData} onProfileSelect={handleProfileSelect} />}
    </div>
  );
};

export default DirectRequestPage;
