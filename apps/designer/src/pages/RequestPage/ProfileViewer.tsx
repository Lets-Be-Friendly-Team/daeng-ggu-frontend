import { PageContainer } from '@daeng-ggu/design-system';

interface ProfileData {
  petId: number;
  petName: string;
  petImageUrl: string;
  petImgName?: string;
  subBreed?: string;
  birthDate?: string;
  gender?: string;
  isNeutered?: boolean;
  weight?: number;
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

  return (
    <PageContainer>
      <div className='flex w-full justify-center rounded-[8px]'>
        <div className='flex items-center'>
          <img
            src={petImageUrl || 'https://via.placeholder.com/100'}
            alt={petName || 'Unknown Pet'}
            className='h-28 w-28 rounded-full'
          />
          <div className='ml-4 grid grid-cols-2 gap-x-4 gap-y-2'>
            <p className='text-iconCaption text-gray-600'>
              이름: <span>{petName}</span>
            </p>
            <p className='text-iconCaption text-gray-600'>
              견종: <span>{subBreed}</span>
            </p>
            <p className='text-iconCaption text-gray-600'>
              몸무게: <span>{weight}kg</span>
            </p>
            <p className='text-iconCaption text-gray-600'>
              성별: <span>{gender === 'male' ? '수컷' : '암컷'}</span>
            </p>
            <p className='text-iconCaption text-gray-600'>
              중성화 여부: <span>{isNeutered ? '예' : '아니오'}</span>
            </p>
            <p className='text-iconCaption text-gray-600'>
              출생일: <span>{birthDate}</span>
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default ProfileViewer;
