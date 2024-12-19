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
      <div className='flex flex-wrap items-center gap-[2rem] text-body2 text-gray-800'>
        <img
          src={petImageUrl || 'https://via.placeholder.com/100'}
          alt={petName || 'Unknown Pet'}
          className='h-[9rem] w-[9rem] rounded-full object-cover'
        />
        <div className='flex flex-col gap-[0.4rem]'>
          <div className='flex gap-[0.4rem]'>
            <div className='text-body1 font-semibold'>{petName}</div>
            <div className='font-bold'>
              {gender === 'W' ? <div className='text-pink-500'>♀︎</div> : <div className='text-blue-700'>♂︎</div>}
            </div>
          </div>
          <div className='text-gray-800'>{extractKorean(subBreed)}</div>

          <div className='flex gap-6 text-body3'>
            <div className='flex items-center gap-2'>
              <div className='text-iconCaption font-semibold text-gray-500'>체중</div>
              <div className='text-gray-800'>{weight}kg</div>
            </div>
            <div className='flex items-center gap-2'>
              <div className='text-iconCaption font-semibold text-gray-500'>중성화 여부</div>
              <div className='text-gray-800'>{isNeutered ? 'O' : 'X'}</div>
            </div>
            <div className='flex items-center gap-2'>
              <div className='text-iconCaption font-semibold text-gray-500'>생년월일</div>
              <div className='text-gray-800'>{birthDate}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileViewer;
