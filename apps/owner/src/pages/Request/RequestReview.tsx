import React from 'react';
import ProfileViewer from '@/pages/Request/ProfileViewer';
import { BorderContainer } from '@daeng-ggu/design-system';

interface ProfileData {
  petId: number;
  petName: string;
  petImgUrl: string;
  breed: string;
  birthDate: string;
  gender: string;
  isNeutered: boolean;
  weight: number;
  specialNotes?: string;
}

interface RequestReviewProps {
  selectedPet: number | null;
  selectedOptions: { [key: number]: string };
  profileData: ProfileData[];
}

const RequestReview: React.FC<RequestReviewProps> = ({ selectedPet, selectedOptions, profileData }) => {
  const selectedProfile = profileData.find((profile) => profile.petId === selectedPet);

  return (
    <div className='p-4'>
      {selectedProfile ? (
        <div className='flex justify-center'>
          <div className='mb-6 flex-col justify-center'>
            <h2 className='mb-6 text-2xl font-bold'>예약 확인</h2>
            <BorderContainer>
              <ProfileViewer profile={selectedProfile} />
            </BorderContainer>
          </div>
        </div>
      ) : (
        <p className='text-red-500'>선택된 반려견이 없습니다.</p>
      )}

      <div className='mb-6'>
        <h3 className='mb-2 text-xl font-semibold'>선택한 옵션:</h3>
        <ul className='ml-5 list-disc'>
          {Object.entries(selectedOptions).map(([step, option]) => (
            <li key={step}>
              <strong>Step {step}:</strong> {option}
            </li>
          ))}
        </ul>
      </div>

      <button
        className='mt-4 rounded bg-blue-500 px-6 py-2 font-bold text-white hover:bg-blue-600'
        onClick={() => alert('예약이 완료되었습니다!')}
      >
        예약 완료
      </button>
    </div>
  );
};

export default RequestReview;
