import { useNavigate } from 'react-router-dom';
import { BulbIcon, FilledHeartIcon, FullStarIcon, TypeTwoButton, UserProfileImage } from '@daeng-ggu/design-system';

import ROUTES from '@/constants/routes';

interface IProfileProps {
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
}
const Profile = ({
  nickname,
  designerImgUrl,
  providedServices,
  possibleBreeds,
  reviewStarAvg,
  reviewLikeCntAll,
  address,
  introduction,
  workExperience,
}: IProfileProps) => {
  const navigate = useNavigate();
  const goToReservations = () => navigate(`/${ROUTES.reservation}`);
  const goToEditProfile = () => navigate(`/profile/${ROUTES.profileEdit}`);

  const extractBracketContent = (text: string) => {
    const match = text.match(/\(([^)]+)\)/);
    return match ? match[1].replace(/,/g, ' | ') : text;
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
      <div className='w-full flex flex-col gap-2'>
        <div className='flex gap-6 py-2'>
          <UserProfileImage size='large' imageUrl={designerImgUrl} />
          <div className='flex flex-col px-3'>
            <div className='flex gap-3'>
              <div className='flex text-sub_h2 text-black'>{nickname}</div>
              <div className='flex gap-[10px] items-center'>
                <div className='flex items-center w-auto h-[15px] gap-1'>
                  <FullStarIcon size='w-[15px] h-[15px]' color='#AAB1B9' />
                  {reviewStarAvg}
                </div>
                <div className='flex items-center w-auto h-[15px] gap-1'>
                  <FilledHeartIcon className='w-[15px] h-[15px]' color='#AAB1B9' />
                  {reviewLikeCntAll}
                </div>
              </div>
            </div>
            <div className='text-caption text-gray-700'>
              <div className='py-2'>{address}</div>
              <div className='flex flex-col gap-1'>
                <div className='text-gray-500'>{services}</div>
                <div className='text-gray-500'>{breeds}</div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-3 text-gray-900'>
          <div className='h-[22px] w-full bg-secondary text-caption rounded-[8px] flex items-center px-2'>
            {introduction}
          </div>
          <div className='h-[22px] w-full bg-secondary text-caption rounded-[8px] flex items-center px-2 gap-1'>
            <div>
              <BulbIcon className='w-[15px] h-[15px]' />
            </div>
            {workExperience}
          </div>
        </div>
        <div className='flex w-full gap-4'>
          <TypeTwoButton text='예약 조회' color='bg-secondary' onClick={goToReservations} />
          <TypeTwoButton text='프로필 수정' onClick={goToEditProfile} className='bg-gray-50' />
        </div>
      </div>
    </div>
  );
};

export default Profile;
