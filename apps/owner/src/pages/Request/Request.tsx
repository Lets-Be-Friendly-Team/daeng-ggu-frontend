import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import useGetOwnerPetProfile from '@/hooks/queries/Request/useGetOwnerPetProfile';
import StepByStep from '@/pages/Request/StepByStep';

const Request = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const dummyData = [
  //   {
  //     petId: 1,
  //     petName: '포돌이',
  //     petImgUrl: 'https://via.placeholder.com/100',
  //     petImgName: 'podori.jpg',
  //     birthDate: '2018-01-15',
  //     gender: 'male',
  //     isNeutered: true,
  //     weight: 68,
  //     majorBreedCode: 'L',
  //     majorBreed: '대형견',
  //     subBreedCode: 'PODOL',
  //     subBreed: 'Podolski',
  //     specialNotes: '활발하며 사교성이 좋습니다.',
  //     isRequested: true,
  //     customerName: '김철수',
  //     phone: '010-1234-5678',
  //     address: '서울시 강남구 테헤란로 123 포돌빌딩 1304호',
  //   },
  //   {
  //     petId: 2,
  //     petName: '장미',
  //     petImgUrl: 'https://via.placeholder.com/100',
  //     petImgName: 'jangmi.jpg',
  //     birthDate: '2020-05-20',
  //     gender: 'female',
  //     isNeutered: false,
  //     weight: 15,
  //     majorBreedCode: 'L',
  //     majorBreed: '대형견',
  //     subBreedCode: 'PODOL',
  //     subBreed: 'Podolski',
  //     specialNotes: '낯선 사람을 경계합니다.',
  //     isRequested: false,
  //     customerName: '이영희',
  //     phone: '010-9876-5432',
  //     address: '부산시 해운대구 해운대로 456 ㅇ노ㅓ오빌딩 1233호',
  //   },
  //   {
  //     petId: 3,
  //     petName: '장군이',
  //     petImgUrl: 'https://via.placeholder.com/100',
  //     petImgName: 'janggun.jpg',
  //     birthDate: '2019-09-10',
  //     gender: 'male',
  //     isNeutered: true,
  //     weight: 10,
  //     majorBreedCode: 'L',
  //     majorBreed: '대형견',
  //     subBreedCode: 'PODOL',
  //     subBreed: 'Podolski',
  //     specialNotes: '조용하고 침착하게 물어요.',
  //     isRequested: false,
  //     customerName: '박민수',
  //     phone: '010-5555-6789',
  //     address: '대전시 유성구 대학로 789 아이스 빌딩 1239호',
  //   },
  // ];

  // Data is fetched using suspense.
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

export default Request;
