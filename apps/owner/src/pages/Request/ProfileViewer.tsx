// components/ProfileViewer.tsx

import React from 'react';

interface ProfileData {
  petId: number;
  petName: string;
  petImgUrl: string;
  petImgName: string;
  breed: string;
  birthDate: string;
  gender: string;
  isNeutered: boolean;
  weight: number;
  isRequested: boolean;
  specialNotes?: string;
}

interface ProfileViewerProps {
  profile: ProfileData;
  onEditProfile?: () => void;
  onNextStep?: () => void;
}

const ProfileViewer: React.FC<ProfileViewerProps> = ({
  profile = {
    petId: 0,
    petName: 'Unknown',
    petImgUrl: '',
    petImgName: 'No Image',
    breed: 'Unknown',
    birthDate: 'N/A',
    gender: 'N/A',
    isNeutered: false,
    weight: 0,
    isRequested: false,
    specialNotes: '',
  },
  onEditProfile = () => {},
  onNextStep = () => {},
}) => {
  const { petImgUrl, petName, breed, weight, gender, isNeutered, birthDate } = profile;

  return (
    <div className='flex flex-col items-center pt-10'>
      <div className='rounded-[8px] border border-primary p-6'>
        <div className='flex items-center'>
          <img
            src={petImgUrl || 'https://via.placeholder.com/100'}
            alt={petName || 'Unknown Pet'}
            className='mb-4 h-32 w-32 rounded-full border border-gray-300'
          />
          <div className='ml-6 grid grid-cols-2 gap-x-4 gap-y-2'>
            <p className='text-sm text-gray-600'>
              이름: <span className='text-primary'>{petName}</span>
            </p>
            <p className='text-sm text-gray-600'>
              견종: <span className='text-primary'>{breed}</span>
            </p>
            <p className='text-sm text-gray-600'>
              몸무게: <span className='text-primary'>{weight}kg</span>
            </p>
            <p className='text-sm text-gray-600'>
              성별: <span className='text-primary'>{gender === 'male' ? '수컷' : '암컷'}</span>
            </p>
            <p className='text-sm text-gray-600'>
              중성화 여부: <span className='text-primary'>{isNeutered ? '예' : '아니오'}</span>
            </p>
            <p className='text-sm text-gray-600'>
              출생일: <span className='text-primary'>{birthDate}</span>
            </p>
          </div>
        </div>
      </div>

      <button
        className='hover:bg-primary-dark mt-6 h-[48px] w-[260px] rounded border border-primary bg-secondary px-4 py-2 text-body2 text-primary'
        onClick={onEditProfile}
      >
        프로필 수정하기
      </button>

      <button
        className='hover:bg-primary-dark mt-6 h-[48px] w-[260px] rounded border border-primary bg-secondary px-4 py-2 text-body2 text-primary'
        onClick={onNextStep}
      >
        다음 단계로 가기
      </button>
    </div>
  );
};

export default ProfileViewer;
