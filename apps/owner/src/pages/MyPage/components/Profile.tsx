import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  BottomSheetModal,
  LogoutIcon,
  MoreIcon,
  SwapIcon,
  TypeTwoButton,
  UserProfileImage,
} from '@daeng-ggu/design-system';

import ROUTES from '@/constants/routes';

interface IProfileProps {
  nickname: string;
  customerImgUrl: string;
  customerImgName: string;
}
const Profile = ({ nickname, customerImgUrl }: IProfileProps) => {
  const navigate = useNavigate();
  const goToReservations = () => {
    navigate('/reservation');
  };
  const goToEditProfile = () => navigate(`/profile/${ROUTES.profileEdit}`);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };
  //로그아웃 api 연동
  const handleLogout = () => {};
  //디자이너로 전환
  const handleTypeChange = () => {
    //개발 url -> 배포 url로 바꾸기
    window.location.href = `${import.meta.env.VITE_DESIGNER_MAIN_URL}`;
  };

  useEffect(() => {
    console.log(isModalOpen);
  }, [isModalOpen]);
  const modalOptions = [
    {
      label: '로그아웃',
      onClick: handleLogout,
      icon: <LogoutIcon size='h-[1.6rem] w-[1.6rem] mr-[0.4rem]' color='fill-gray-800' />,
    },
    {
      label: '디자이너로 전환',
      onClick: handleTypeChange,
      icon: <SwapIcon size='h-[1.6rem] w-[1.6rem] mr-[0.4rem]' color='fill-gray-800' />,
    },
  ];
  return (
    <div className='w-full'>
      <div className='flex items-center justify-between'>
        <div className='flex gap-6'>
          <UserProfileImage size='large' imageUrl={customerImgUrl} />
          <div className='flex h-auto items-center px-3 text-sub_h2 text-black'>{nickname}</div>
        </div>
        <div className='cursor-pointer' onClick={toggleModal}>
          <MoreIcon className='w-[2.4rem] rotate-90' color='#949CA5' />
        </div>
      </div>
      <div className='flex w-full gap-4 pt-[10px]'>
        <TypeTwoButton text='예약 조회' color='bg-secondary' onClick={goToReservations} />
        <TypeTwoButton text='프로필 수정' onClick={goToEditProfile} className='bg-gray-50' />
      </div>
      <div className='ml-[-2rem]'>
        <BottomSheetModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} options={modalOptions} />
      </div>
    </div>
  );
};
export default Profile;
