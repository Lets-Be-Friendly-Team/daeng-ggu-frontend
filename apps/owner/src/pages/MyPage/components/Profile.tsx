import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  BottomSheetModal,
  LogoutIcon,
  Modal,
  MoreIcon,
  SwapIcon,
  TypeTwoButton,
  UserProfileImage,
} from '@daeng-ggu/design-system';
import { useModalStore, useToast } from '@daeng-ggu/shared';

import getLogin from '@/apis/login/getLogin';
import getLogout from '@/apis/login/getLogout';
import ROUTES from '@/constants/routes';
import useOwnerIdStore from '@/stores/useOwnerIdStore';

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
  const { show } = useModalStore();
  const { showToast } = useToast();
  const { setOwnerId } = useOwnerIdStore();
  const clearOwnerIdStorage = useOwnerIdStore.persist.clearStorage;

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  //로그아웃 처리
  const handleLogout = () => {
    show(Modal, {
      title: '로그아웃 하시겠습니까?',
      onConfirm: async () => {
        const response = await getLogout();
        if (response.status === 'SUCCESS') {
          setOwnerId(-1);
          clearOwnerIdStorage(); //localStorage에서 ownerId 삭제
          navigate(ROUTES.main);
        } else {
          showToast({ message: '로그아웃에 실패했습니다', type: 'error' });
        }
      },
      onClose: () => close(),
      confirmText: '로그아웃',
      cancelText: '취소',
    });
  };
  //디자이너로 전환
  const handleTypeChange = async () => {
    //개발 url -> 배포 url로 바꾸기
    // window.location.href = `${import.meta.env.VITE_DESIGNER_MAIN_URL}`;
    const data = await getLogin({ userType: 'D' });
    window.location.href = data.data;
  };

  // useEffect(() => {
  //   console.log(isModalOpen);
  // }, [isModalOpen]);
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
    <div className='mt-[1rem] w-full'>
      <div className='flex items-center justify-between'>
        <div className='flex gap-6'>
          <UserProfileImage size='large' imageUrl={customerImgUrl} />
          <div className='flex h-auto items-center px-3 text-sub_h2 font-semibold text-black'>{nickname}</div>
        </div>
        <div className='cursor-pointer' onClick={toggleModal}>
          <MoreIcon className='w-[2.4rem] rotate-90' color='#949CA5' />
        </div>
      </div>

      <div className='flex w-full gap-4 pt-[2rem]'>
        <TypeTwoButton
          text='예약 현황'
          onClick={goToReservations}
          className='bg-gray-50 text-gray-800 hover:bg-secondary hover:text-primary'
          // fontWeight='font-normal'
        />
        <TypeTwoButton
          text='프로필 수정'
          onClick={goToEditProfile}
          className='bg-gray-50 text-gray-800 hover:bg-secondary hover:text-primary'
        />
      </div>
      <div className='ml-[-2rem]'>
        <BottomSheetModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} options={modalOptions} />
      </div>
    </div>
  );
};
export default Profile;
