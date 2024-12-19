import { useNavigate } from 'react-router-dom';
import {
  BookmarkFillIcon,
  BulbIcon,
  FilledHeartIcon,
  FullStarIcon,
  LocationIcon,
  TypeTwoButton,
  UserProfileImage,
} from '@daeng-ggu/design-system';

interface IProfileProps {
  isBookmarked: boolean;
  designerId: number;
  designerName?: string; // 디자이너 이름
  nickname: string; // 닉네임
  designerImgUrl: string; // 프로필 이미지 URL
  designerImgName?: string; // 프로필 이미지 이름
  providedServices?: { servicesCode: string; codeDesc: string }[]; // 제공 서비스
  possibleBreeds?: { breedCode: string; codeDesc: string }[]; // 가능 견종
  reviewStarAvg?: number; // 평균 리뷰 별점
  reviewLikeCntAll?: number; // 총 리뷰 좋아요 개수
  address?: string; // 주소
  introduction?: string; // 소개
  workExperience?: string; // 경력
  // eslint-disable-next-line no-unused-vars
  onBookmarkToggle: (designerId: number, updatedStatus: boolean) => void;
}
const Profile = ({
  isBookmarked,
  designerId,
  nickname,
  designerImgUrl,
  providedServices,
  possibleBreeds,
  reviewStarAvg,
  reviewLikeCntAll,
  address,
  introduction,
  workExperience,
  onBookmarkToggle,
}: IProfileProps) => {
  const navigate = useNavigate();
  const goToReservations = () => navigate('/profile/reservation');
  const extractBracketContent = (text: string) => {
    const match = text.match(/\(([^)]+)\)/);
    return match ? match[1].replace(/,/g, ' | ') : text;
  };

  const handleBookmarkToggle = () => {
    onBookmarkToggle(designerId, !isBookmarked);
  };

  const services = providedServices?.map((service) => extractBracketContent(service.codeDesc)).join(' | ');
  const breedMapping: { [key: string]: string } = {
    P1: '소형견',
    P2: '중형견',
    P3: '대형견',
  };

  const breeds = possibleBreeds?.map((breed) => breedMapping[breed.breedCode] || '특수 견종').join(' | ');
  return (
    <div>
      <div className='flex w-full flex-col gap-2'>
        <div className='flex gap-6 py-[1rem]'>
          <UserProfileImage size='large' imageUrl={designerImgUrl} />
          <div className='flex flex-col gap-[0.8rem] px-3'>
            <div className='flex items-center gap-3'>
              <div className='text-sub_h2 font-semibold text-black'>{nickname}</div>
              <div className='flex h-[2rem] items-center gap-[1rem]'>
                <div className='l flex w-auto items-center gap-1 text-iconCaption'>
                  <FullStarIcon size='w-[1.3rem] h-[1.3rem]' color='#FFC90A' />
                  {reviewStarAvg || 0}
                </div>
                <div className='flex w-auto items-center gap-1 text-iconCaption'>
                  <button>
                    <FilledHeartIcon className='h-[1.5rem] w-[1.5rem]' color='#ff6842' />
                  </button>
                  {reviewLikeCntAll}
                </div>
                <div className='flex w-auto items-center gap-1'>
                  <button onClick={handleBookmarkToggle}>
                    <BookmarkFillIcon className='h-[1.3rem] w-[1.3rem]' color={isBookmarked ? '#ff6842' : '#AAB1B9'} />
                  </button>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-[1rem] text-caption text-gray-700'>
              <div className='flex items-center'>
                <LocationIcon size='w-[1.5rem]' />
                <div className='pt-1'>{address}</div>
              </div>
              <div className='flex flex-col gap-[0.8rem]'>
                <div className='text-gray-500'>{services}</div>
                <div className='text-gray-500'>{breeds} 전문</div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-[1rem] px-[0.5rem] py-[1.2rem] text-gray-900'>
          {/* <div className='flex w-full items-center gap-2 rounded-[8px] p-[1rem] text-caption'> */}
          <div className='flex w-full items-center gap-2 text-caption'>
            <BulbIcon className='h-[15px] w-[15px]' />
            <div>총 경력 {workExperience}</div>
          </div>
          <div className='flex w-full items-center gap-2 rounded-[8px] text-caption'>
            <BulbIcon className='h-[15px] w-[15px]' />
            <div>{introduction}</div>
          </div>
          {/* <div className='flex w-full items-center rounded-md bg-secondary p-[1rem] text-caption'>{introduction}</div> */}
        </div>
        <div className='flex w-full pt-2'>
          <TypeTwoButton
            text='1 : 1 예약하기'
            color='bg-gray-50 hover:bg-secondary hover:text-primary hover:border hover:border-primary'
            onClick={goToReservations}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
