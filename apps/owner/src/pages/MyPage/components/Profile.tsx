import { useNavigate } from 'react-router';
import { TypeTwoButton, UserProfileImage } from '@daeng-ggu/design-system';

import ROUTES from '@/constants/routes';

interface IProfileProps {
  nickname: string;
  customerImgUrl: string;
  customerImgName: string;
}
const Profile = ({ nickname, customerImgUrl }: IProfileProps) => {
  const navigate = useNavigate();
  const goToReservations = () => navigate(`/${ROUTES.reservation}`);
  const goToEditProfile = () => navigate('/profile/edit');
  return (
    <div className='w-full'>
      <div className='flex gap-6'>
        <UserProfileImage size='large' imageUrl={customerImgUrl} />
        <div className='flex h-auto items-center px-3 text-sub_h2 text-black'>{nickname}</div>
      </div>
      <div className='flex w-full gap-4 pt-[10px]'>
        <TypeTwoButton text='예약 조회' color='bg-secondary' onClick={goToReservations} />
        <TypeTwoButton text='프로필 수정' onClick={goToEditProfile} className='bg-gray-50' />
      </div>
    </div>
  );
};
export default Profile;
