import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BottomSheetModal,
  BulbIcon,
  DeleteIcon,
  FilledHeartIcon,
  FullStarIcon,
  LogoutIcon,
  Modal,
  MoreIcon,
  SwapIcon,
  TypeTwoButton,
  UserProfileImage,
} from '@daeng-ggu/design-system';
import { useModalStore, useToast } from '@daeng-ggu/shared';

import getLogin from '@/apis/Login/getLogin';
import ROUTES from '@/constants/routes';
import useDeleteProfile from '@/hooks/queries/Profile/useDeleteProfile';
import useDesignerIdStore from '@/stores/useDesignerIdStore';

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
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const { show } = useModalStore();
  const { setDesignerId } = useDesignerIdStore();
  const clearDesignerIdStorage = useDesignerIdStore.persist.clearStorage;
  const navigate = useNavigate();
  const goToReservations = () => navigate(`${ROUTES.reservation}`);
  const goToEditProfile = () => navigate(`/profile/${ROUTES.profileEdit}`);
  const { mutate: deleteProfile } = useDeleteProfile();
  const { designerId } = useDesignerIdStore();
  const { showToast } = useToast();

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

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };
  // 로그아웃 api 연동
  const handleLogout = () => {
    show(Modal, {
      title: '로그아웃 하시겠습니까?',
      onConfirm: () => {
        setDesignerId(-1);
        clearDesignerIdStorage();
        window.location.href = `${import.meta.env.VITE_OWNER_MAIN_URL}/login`;
      },
      onClose: () => close(),
      confirmText: '로그아웃',
      cancelText: '취소',
    });
  };
  const handleDelete = () => {
    setModalOpen(false);
    showDeleteConfirmationModal();
  };
  // 보호자로 전환
  const handleTypeChange = async () => {
    const data = await getLogin({ userType: 'C' });
    window.location.href = data.data;
  };

  const modalOptions = [
    {
      label: '로그아웃',
      onClick: handleLogout,
      icon: <LogoutIcon size='h-[1.6rem] w-[1.6rem] mr-[0.4rem]' color='fill-gray-800' />,
    },
    {
      label: '보호자로 전환',
      onClick: handleTypeChange,
      icon: <SwapIcon size='h-[1.6rem] w-[1.6rem] mr-[0.4rem]' color='fill-gray-800' />,
    },
    {
      label: '프로필 삭제하기',
      onClick: handleDelete,
      color: 'text-primary',
      icon: <DeleteIcon className='h-[15px] w-[15px]' color='#FF6842' />,
    },
  ];

  const showDeleteConfirmationModal = () => {
    show(Modal, {
      title: '내 프로필 삭제',
      description: '삭제 시 보호자와의 매칭이 불가합니다. 프로필을 삭제하시겠습니까?',
      onConfirm: () => {
        deleteProfile(
          { designerId: Number(designerId) },
          {
            onSuccess: () => {
              console.log('리뷰 삭제 성공');
              showToast({ message: '프로필이 삭제 되었습니다!', type: 'confirm' });
              navigate('/signup/success');
            },
            onError: (error) => {
              console.error('프로필 삭제 실패', error);
            },
          },
        );
      },
      onClose: () => close(),
      confirmText: '네',
      cancelText: '아니오',
    });
  };

  return (
    <div>
      <div className='w-full flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <div className='flex gap-6 py-2'>
            <UserProfileImage size='large' imageUrl={designerImgUrl} />
            <div className='flex flex-col px-3'>
              <div className='flex gap-3'>
                <div className='flex text-sub_h2 text-black'>{nickname}</div>
                <div className='flex gap-[10px] items-center'>
                  <div className='flex items-center w-auto h-[15px] gap-1'>
                    <FullStarIcon size='w-[15px] h-[15px]' color='#AAB1B9' />
                    {reviewStarAvg || 0}
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
          <div className='cursor-pointer' onClick={toggleModal}>
            <MoreIcon className='w-[2.4rem] rotate-90' color='#949CA5' />
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
      <div className='ml-[-2rem]'>
        <BottomSheetModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} options={modalOptions} />
      </div>
    </div>
  );
};

export default Profile;
