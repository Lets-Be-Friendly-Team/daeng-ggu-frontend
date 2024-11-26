import React from 'react';

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

interface ProfileViewerProps {
  profile: ProfileData;
}

const ProfileViewer: React.FC<ProfileViewerProps> = ({
                                                       profile = {
                                                         petId: 0,
                                                         petName: 'Unknown',
                                                         petImgUrl: '',
                                                         breed: 'Unknown',
                                                         birthDate: 'N/A',
                                                         gender: 'N/A',
                                                         isNeutered: false,
                                                         weight: 0,
                                                         specialNotes: '',
                                                       },
                                                     }) => {
  const { petImgUrl, petName, breed, weight, gender, isNeutered, birthDate } = profile;

  return (
      <div className="rounded-[8px] border border-primary p-6 bg-white min-w-[250px] flex justify-center">
        <div className="flex items-center">
          <img
            src={petImgUrl || 'https://via.placeholder.com/100'}
            alt={petName || 'Unknown Pet'}
            className="mb-4 h-28 w-28 rounded-full border border-gray-300"
          />
          <div className="ml-4 grid grid-cols-2 gap-x-4 gap-y-2">
            <p className="text-iconCaption text-gray-600">
              이름: <span className="text-primary">{petName}</span>
            </p>
            <p className="text-iconCaption  text-gray-600">
              견종: <span className="text-primary">{breed}</span>
            </p>
            <p className="text-iconCaption text-gray-600">
              몸무게: <span className="text-primary">{weight}kg</span>
            </p>
            <p className="text-iconCaption text-gray-600">
              성별: <span className="text-primary">{gender === 'male' ? '수컷' : '암컷'}</span>
            </p>
            <p className="text-iconCaption text-gray-600">
              중성화 여부: <span className="text-primary">{isNeutered ? '예' : '아니오'}</span>
            </p>
            <p className="text-iconCaption text-gray-600">
              출생일: <span className="text-primary">{birthDate}</span>
            </p>
          </div>
        </div>
      </div>
  );
};

export default ProfileViewer;
