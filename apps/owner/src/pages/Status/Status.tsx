import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import React from 'react';

const Status = () => {
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
      dogType: '대형견',
      specialNotes: '활발하며 사교성이 좋습니다.',
      isRequested: true,
      customerName: '김철수',
      phone: '010-1234-5678',
      address: '서울시 강남구 테헤란로 123 포돌빌딩 1304호'

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
      dogType: '중형견',
      specialNotes: '낯선 사람을 경계합니다.',
      isRequested: false,
      customerName: '이영희',
      phone: '010-9876-5432',
      address: '부산시 해운대구 해운대로 456 ㅇ노ㅓ오빌딩 1233호'
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
      dogType: '소형견',
      specialNotes: '조용하고 침착하게 물어요.',
      isRequested: false,
      customerName: '박민수',
      phone: '010-5555-6789',
      address: '대전시 유성구 대학로 789 아이스 빌딩 1239호'
    }
  ];


  useEffect(() => {
    const previousPath = location.state?.from || '';

    if (previousPath !== '/test') {
      alert(`ㄴㄴ ${previousPath || 'unknown'}`);
      setTimeout(() => navigate('/', { replace: true }), 0);
    }
  }, [location, navigate]);


  return (
    <div className='h-full max-w-[480px]'>
      hello
    </div>
  );
};

export default Status;
