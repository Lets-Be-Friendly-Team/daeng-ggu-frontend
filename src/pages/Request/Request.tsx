import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import StepByStep from '@/pages/Request/StepByStep.tsx';

const Request = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dummyData = [
    {
      petId: 1,
      petName: '포돌이',
      petImgUrl: 'https://via.placeholder.com/100',
      isRequested: true,
    },
    {
      petId: 2,
      petName: '장미',
      petImgUrl: 'https://via.placeholder.com/100',
      isRequested: false,
    },
    {
      petId: 3,
      petName: '장군이',
      petImgUrl: 'https://via.placeholder.com/100',
      isRequested: false,
    },
  ];

  useEffect(() => {
    const previousPath = location.state?.from || '';

    if (previousPath !== '/test') {
      alert(`ㄴㄴ ${previousPath || 'unknown'}`);
      setTimeout(() => navigate('/', { replace: true }), 0);
    }
  }, [location, navigate]);

  const handleProfileSelect = (petId: number) => {
    console.log(petId);
  };

  return (
    <div className='h-full w-full'>
      <StepByStep stepCount={8} profileData={dummyData} onProfileSelect={handleProfileSelect} />
    </div>
  );
};

export default Request;
