import { extractKorean } from '@daeng-ggu/shared';

interface ProfileData {
  petId: number;
  petName: string;
  petImageUrl: string;
  petImgName?: string;
  subBreed: string;
  birthDate: string;
  gender: string;
  isNeutered: boolean;
  weight: number;
  majorBreed?: string;
  isRequested?: boolean;
  specialNotes?: string;
  customerName?: string;
  phone?: string;
  address?: string;
}

interface ProfileViewerProps {
  profile: ProfileData;
}

const ProfileViewer = ({
  profile = {
    petId: 0,
    petName: 'Unknown',
    petImageUrl: '',
    subBreed: 'Unknown',
    birthDate: 'N/A',
    gender: 'N/A',
    isNeutered: false,
    weight: 0,
    specialNotes: '',
  },
}: ProfileViewerProps) => {
  const { petImageUrl, petName, subBreed, weight, gender, isNeutered, birthDate } = profile;
  console.log("what's inside: ", profile.subBreed);
  return (
    <div className='mx-auto flex w-full max-w-screen-lg flex-col gap-8 rounded-md px-6 py-10 shadow'>
      <div className='flex flex-wrap items-center justify-between'>
        <img
          src={petImageUrl || 'https://via.placeholder.com/100'}
          alt={petName || 'Unknown Pet'}
          className='h-28 w-28 rounded-full object-cover'
        />
        <div className='flex flex-col gap-4 text-base text-gray-600'>
          <div className='flex items-center gap-4'>
            <div className='font-semibold text-gray-500'>이름</div>
            <div className='text-gray-800'>{petName}</div>
          </div>
          <div className='flex items-center gap-4'>
            <div className='font-semibold text-gray-500'>생년월일</div>
            <div className='text-gray-800'>{birthDate}</div>
          </div>
          <div className='flex items-center gap-4'>
            <div className='font-semibold text-gray-500'>성별</div>
            <div className='text-gray-800'>{gender === 'W' ? '암컷' : '수컷'}</div>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4 text-base text-gray-600'>
        <div className='flex items-center gap-4'>
          <div className='font-semibold text-gray-500'>견종</div>
          <div className='text-gray-800'>{extractKorean(subBreed)}</div>
        </div>
        <div className='flex items-center gap-4'>
          <div className='font-semibold text-gray-500'>몸무게</div>
          <div className='text-gray-800'>{weight}kg</div>
        </div>
        <div className='flex items-center gap-4'>
          <div className='font-semibold text-gray-500'>중성화 여부</div>
          <div className='text-gray-800'>{isNeutered ? '예' : '아니오'}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileViewer;
