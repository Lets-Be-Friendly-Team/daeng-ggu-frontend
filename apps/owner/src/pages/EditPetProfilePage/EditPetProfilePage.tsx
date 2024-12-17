import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  Header,
  Input,
  Modal,
  PageContainer,
  ProfileImgUploader,
  TextArea,
  TypeOneButton,
  TypeTwoButton,
} from '@daeng-ggu/design-system';
import { useModalStore, useToast } from '@daeng-ggu/shared';

import useDeletePetProfile from '@/hooks/queries/PetProfile/useDeletePetProfile';
import useGetPetProfileDetail from '@/hooks/queries/PetProfile/useGetPetProfileDetail';
import useOwnerIdStore from '@/stores/useOwnerIdStore';

const EditPetProfilePage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const petId = params.petId;
  // const customerId = 2;
  const { ownerId } = useOwnerIdStore();
  const { data: petData } = useGetPetProfileDetail(ownerId, Number(petId));
  const { mutate: deletePetProfile } = useDeletePetProfile();
  console.log(petData);
  const [formData, setFormData] = useState({
    petId: 0,
    petName: '',
    petImgUrl: '',
    majorBreedCode: '',
    majorBreed: '',
    subBreedCode: '',
    subBreed: '',
    birthDate: '',
    gender: '',
    isNeutered: '',
    weight: 0,
    specialNotes: '',
  });
  const [profileImage, setProfileImage] = useState<File | undefined>(undefined);
  const { show } = useModalStore();
  const { showToast } = useToast();

  useEffect(() => {
    if (petData) {
      setFormData(petData);
      setProfileImage(undefined);
    }
  }, [petData]);

  const navigateBack = () => {
    navigate('/profile');
  };
  const handleDelete = () => {
    showDeleteConfirmationModal();
  };
  const showDeleteConfirmationModal = () => {
    show(Modal, {
      title: '반려견 프로필 삭제',
      description: '반려견 프로필을 삭제하시겠습니까?',
      onConfirm: () => {
        deletePetProfile(
          { customerId: ownerId, petId: Number(petId) },
          {
            onSuccess: () => {
              console.log('반려동물 프로필 삭제 성공');
              showToast({ message: '반려견 프로필이 삭제 되었습니다!', type: 'confirm' });
              navigateBack();
            },
            onError: (error) => {
              console.error('반려동물 프로필 삭제 실패', error);
            },
          },
        );
      },
      onClose: () => close(),
      confirmText: '네',
      cancelText: '아니오',
    });
  };
  const handleChange = (field: string, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const submitFormData = () => {
    try {
      const payload = {
        ...formData,
        newPetImgFile: profileImage || '',
      };

      // 데이터를 localStorage에 저장 (테스트용)
      localStorage.setItem('petProfile', JSON.stringify(payload));

      alert('반려견 프로필이 저장되었습니다.');
      navigate(-1);
    } catch (error) {
      alert('반려견 프로필 저장에 실패했습니다.');
      console.error(error);
    }
  };
  const handleImageDelete = () => {
    setProfileImage(undefined);
    setFormData((prev) => ({ ...prev, petImgUrl: '' }));
  };

  return (
    <div>
      <PageContainer>
        <Header mode='back' title={`${formData.petName} 프로필 수정`} />
        <div className='flex h-[180px] w-full flex-col items-center justify-center gap-[15px]'>
          <ProfileImgUploader image={profileImage} setImage={setProfileImage} initialImageUrl={formData.petImgUrl} />
          <button className='block text-caption text-gray-400' onClick={handleImageDelete}>
            프로필 사진 삭제
          </button>
        </div>
        <div className='flex flex-col gap-5'>
          <Input
            label='이름'
            placeholder='반려견 이름을 입력해주세요'
            value={formData.petName}
            onChange={(e) => handleChange('petName', e.target.value)}
          />
          <Input
            label='견종'
            placeholder='견종을 입력해주세요'
            value={formData.subBreed}
            onChange={(e) => handleChange('subBreed', e.target.value)}
          />
          <Input
            label='생일'
            placeholder='생일을 입력해주세요'
            value={formData.birthDate}
            onChange={(e) => handleChange('birthDate', e.target.value)}
          />
          <div>
            <div className='mb-[0.4rem] block text-body3 font-semibold text-gray-800'>성별</div>
            <div className='flex gap-1'>
              <TypeTwoButton
                text='남'
                className={formData.gender === 'M' ? 'bg-secondary' : 'bg-gray-50'}
                onClick={() => handleChange('gender', 'M')}
                fontWeight='font-medium'
              />
              <TypeTwoButton
                text='여'
                color={formData.gender === 'F' ? 'bg-secondary' : 'bg-gray-50'}
                onClick={() => handleChange('gender', 'W')}
                fontWeight='font-medium'
              />
            </div>
          </div>
          <div>
            <div className='mb-[0.4rem] block text-body3 font-semibold text-gray-800'>중성화 여부</div>
            <div className='flex gap-1'>
              <TypeTwoButton
                text='O'
                color={formData.isNeutered === 'Y' ? 'bg-secondary' : 'bg-gray-50'}
                onClick={() => handleChange('isNeutered', 'Y')}
              />
              <TypeTwoButton
                text='X'
                color={formData.isNeutered === 'N' ? 'bg-secondary' : 'bg-gray-50'}
                onClick={() => handleChange('isNeutered', 'N')}
              />
            </div>
          </div>
          <Input
            label='몸무게 (kg 단위)'
            placeholder='몸무게를 입력해주세요'
            value={formData.weight}
            onChange={(e) => handleChange('weight', e.target.value)}
          />
          <TextArea
            label='특이사항 (입질, 아픈 곳, 예민한 곳)'
            placeholder='특이사항을 입력해주세요'
            value={formData.specialNotes}
            onChange={(e) => handleChange('specialNotes', e.target.value)}
          />
          <div className='mb-[0.8rem] block text-body3 font-semibold text-gray-800'>
            <TypeTwoButton text='삭제하기' color='bg-secondary' onClick={handleDelete} />
          </div>
        </div>
      </PageContainer>
      <TypeOneButton text='저장하기' color='bg-secondary' onClick={submitFormData} />
    </div>
  );
};

export default EditPetProfilePage;
