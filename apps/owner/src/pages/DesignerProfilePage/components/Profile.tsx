import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BulbIcon, FilledHeartIcon, FullStarIcon, TypeTwoButton, UserProfileImage } from '@daeng-ggu/design-system';
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
  const goToReservations = () => navigate('/profile/reservation');
  const [isLiked, setIsLiked] = useState<boolean>(false);
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
      <div className='flex w-full flex-col gap-2'>
        <div className='flex gap-6 py-2'>
          <UserProfileImage size='large' imageUrl={designerImgUrl} />
          <div className='flex flex-col px-3'>
            <div className='flex gap-3'>
              <div className='flex text-sub_h2 text-black'>{nickname}</div>
              <div className='flex items-center gap-[10px]'>
                <div className='flex h-[15px] w-auto items-center gap-1'>
                  <FullStarIcon size='w-[15px] h-[15px]' color='#AAB1B9' />
                  {reviewStarAvg}
                </div>
                <div className='flex h-[15px] w-auto items-center gap-1'>
                  <button onClick={() => setIsLiked((prev) => !prev)}>
                    <FilledHeartIcon className='h-[15px] w-[15px]' color={isLiked ? '#ff6842' : '#AAB1B9'} />
                  </button>
                  {reviewLikeCntAll}
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-2 text-caption text-gray-700'>
              <div className='py-2'>{address}</div>
              <div className='flex flex-col gap-1'>
                <div className='text-gray-500'>{services}</div>
                <div className='text-gray-500'>{breeds}</div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-3 text-gray-900'>
          <div className='flex h-[22px] w-full items-center rounded-[8px] bg-secondary px-2 text-caption'>
            {introduction}
          </div>
          <div className='flex h-[22px] w-full items-center gap-1 rounded-[8px] bg-secondary px-2 text-caption'>
            <div>
              <BulbIcon className='h-[15px] w-[15px]' />
            </div>
            {workExperience}
          </div>
        </div>
        <div className='flex w-full pt-2'>
          <TypeTwoButton text='1 : 1 다이렉트 예약하기' color='bg-secondary' onClick={goToReservations} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
