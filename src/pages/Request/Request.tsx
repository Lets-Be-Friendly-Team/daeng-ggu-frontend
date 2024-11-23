import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Progress } from '@/components/_common/progress.tsx';

import ProfileButton from './ProfileButton'; // Import the ProfileButton component

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
  ];

  useEffect(() => {
    const previousPath = location.state?.from || '';

    if (previousPath !== '/test') {
      alert(previousPath);
      navigate('/', { replace: true });
    }
  }, [location, navigate]);

  const handleProfileClick = (petId: number) => {
    alert(`You clicked on pet with ID: ${petId}`);
  };

  const input = '테수트테수트';
  const initialStep = 4;
  const steps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className='h-full w-full'>
      <div className='mt-3'>
        <div className='ml-4 mr-4'>
          <Progress value={initialStep} text={input} maxStep={steps.length} />
        </div>
        <div className='flex h-[300px] flex-wrap items-center justify-center gap-4'>
          {dummyData.map((pet) => (
            <ProfileButton
              key={pet.petId}
              petName={pet.petName}
              petImgUrl={pet.petImgUrl}
              isRequested={pet.isRequested}
              onClick={() => handleProfileClick(pet.petId)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Request;
