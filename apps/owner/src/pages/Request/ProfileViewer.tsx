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
    <div className='flex w-full justify-center rounded-[8px] border-primary bg-white p-6'>
      <div className='flex items-center'>
        <img
          src={petImageUrl || 'https://via.placeholder.com/100'}
          alt={petName || 'Unknown Pet'}
          className='h-28 w-28 rounded-full border border-gray-300'
        />
        <div className='ml-4 grid grid-cols-2 gap-x-4 gap-y-2'>
          <p className='text-iconCaption text-gray-600'>
            이름: <span className='text-primary'>{petName}</span>
          </p>
          <p className='text-iconCaption text-gray-600'>
            견종: <span className='text-primary'>{subBreed}</span>
          </p>
          <p className='text-iconCaption text-gray-600'>
            몸무게: <span className='text-primary'>{weight}kg</span>
          </p>
          <p className='text-iconCaption text-gray-600'>
            성별: <span className='text-primary'>{gender === 'male' ? '수컷' : '암컷'}</span>
          </p>
          <p className='text-iconCaption text-gray-600'>
            중성화 여부: <span className='text-primary'>{isNeutered ? '예' : '아니오'}</span>
          </p>
          <p className='text-iconCaption text-gray-600'>
            출생일: <span className='text-primary'>{birthDate}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileViewer;
