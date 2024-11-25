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
      petImgName: 'podori.jpg',
      breed: 'Podolski',
      birthDate: '2018-01-15',
      gender: 'male',
      isNeutered: true,
      weight: 68,
      specialNotes: '활발하며 사교성이 좋습니다.',
      isRequested: true,
    },
    {
      petId: 2,
      petName: '장미',
      petImgUrl: 'https://via.placeholder.com/100',
      petImgName: 'jangmi.jpg',
      breed: 'Podolski',
      birthDate: '2020-05-20',
      gender: 'female',
      isNeutered: false,
      weight: 15,
      specialNotes: '낯선 사람을 경계합니다.',
      isRequested: false,
    },
    {
      petId: 3,
      petName: '장군이',
      petImgUrl: 'https://via.placeholder.com/100',
      petImgName: 'janggun.jpg',
      breed: 'Podolski',
      birthDate: '2019-09-10',
      gender: 'male',
      isNeutered: true,
      weight: 10,
      specialNotes: '조용하고 침착합니다.',
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
