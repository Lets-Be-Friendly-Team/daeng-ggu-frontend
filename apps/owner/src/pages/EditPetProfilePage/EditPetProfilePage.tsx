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

import useSingleImageUpload from '@/hooks/queries/ImageUpload/useSingleImageUpload';
import useDeletePetProfile from '@/hooks/queries/PetProfile/useDeletePetProfile';
import useGetPetProfileDetail from '@/hooks/queries/PetProfile/useGetPetProfileDetail';
import useRegisterPetProfile from '@/hooks/queries/PetProfile/useRegisterPetProfile';
import { PetFormData } from '@/pages/AddPetProfilePage/AddPetProfilePage';
import useOwnerIdStore from '@/stores/useOwnerIdStore';
const initialFormData = {
  customerId: 0, // ownerId는 컴포넌트 내부에서 동적으로 설정
  petId: 0,
  petName: '',
  newPetImgUrl: '',
  prePetImgUrl: '',
  majorBreedCode: '',
  subBreedCode: '',
  birthDate: '',
  gender: '',
  isNeutered: '',
  weight: 0,
  specialNotes: '',
};

const EditPetProfilePage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const petId = params.petId;
  // const customerId = 2;
  const { ownerId } = useOwnerIdStore();
  const { data: petData } = useGetPetProfileDetail(ownerId, Number(petId));
  const { mutate: deletePetProfile } = useDeletePetProfile();
  // console.log(petData);
  const [formData, setFormData] = useState({
    ...initialFormData,
    customerId: ownerId,
    petId: Number(petId),
  });
  const [profileImage, setProfileImage] = useState<File | undefined>(undefined);
  const { show } = useModalStore();
  const { showToast } = useToast();
  const initialPetName = petData?.petName;
  const [activeBtn, setActiveBtn] = useState(false);

  useEffect(() => {
    if (petData) {
      setFormData({
        customerId: ownerId, // petData에 ownerId가 포함되어 있지 않으므로 수동으로 추가
        petId: Number(petId),
        petName: petData.petName || '', // petData에서 이름을 가져옵니다.
        prePetImgUrl: petData.petImgUrl || '',
        newPetImgUrl: '',
        majorBreedCode: petData.majorBreedCode || '',
        subBreedCode: petData.subBreedCode || '',
        birthDate: petData.birthDate || '',
        gender: petData.gender || '',
        isNeutered: petData.isNeutered || '',
        weight: petData.weight || 0,
        specialNotes: petData.specialNotes || '',
      });
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
      // title: '반려견 프로필 삭제',
      title: `${initialPetName} 프로필을 삭제하시겠습니까?`,
      // description: '반려견 프로필을 삭제하시겠습니까?',
      description: '프로필을 삭제하면 되돌릴 수 없습니다.',
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
      confirmText: '삭제',
      // confirmText: '네',
      cancelText: '유지',
      // cancelText: '아니오',
    });
  };
  const handleChange = (field: string, value: string | number | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBirthChange = (value: string) => {
    const result = value.replace(/\D/g, '').slice(0, 8);
    setFormData((prev) => ({ ...prev, birthDate: result }));
  };

  // 이미지 전송
  const { mutate: imgUpload } = useSingleImageUpload();
  // 데이터 전송
  const { mutate: registerPet } = useRegisterPetProfile({
    onSuccess: (data) => {
      // 반려견 등록 성공시
      console.log('반려견 프로필 수정 성공', data);
      navigate(-1);
    },
    onError: (error) => {
      // 반려견 등록 실패시
      console.log('반려견 프로필 수정 실패', error);
    },
  });

  // const submitFormData = () => {
  //   try {
  //     const payload = {
  //       ...formData,
  //       newPetImgFile: profileImage || '',
  //     };

  //     // 데이터를 localStorage에 저장 (테스트용)
  //     localStorage.setItem('petProfile', JSON.stringify(payload));

  //     alert('반려견 프로필이 저장되었습니다.');
  //     navigate(-1);
  //   } catch (error) {
  //     alert('반려견 프로필 저장에 실패했습니다.');
  //     console.error(error);
  //   }
  // };

  const submitFormData = () => {
    if (profileImage) {
      imgUpload(profileImage, {
        onSuccess: (url) => {
          // alert(`이미지 업로드 성공! URL: ${url}`);
          const payload = {
            ...formData,
            newPetImgUrl: url || '',
            weight: Number(formData.weight),
          };
          console.log(payload);
          registerPet(payload);
        },
        onError: (error) => {
          alert(`이미지 업로드 실패: ${error.message}`);
        },
      });
    } else {
      if (formData.prePetImgUrl === '') {
        // 기존 프사 지웠을때
        const payload = {
          ...formData,
          weight: Number(formData.weight),
        };
        console.log(payload);
        registerPet(payload);
      } else {
        const payload = {
          ...formData,
          newPetImgUrl: petData?.petImgUrl || '',
          weight: Number(formData.weight),
        };
        console.log(payload);
        registerPet(payload);
      }
    }
  };

  const handleImageDelete = () => {
    setProfileImage(undefined);
    setFormData((prev) => ({ ...prev, prePetImgUrl: '', newPetImgUrl: '' }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  // 필수 정보 입력되면 버튼 활성화
  useEffect(() => {
    console.log(formData);
    const nonRequiredFileds = ['prePetImgUrl', 'newPetImgUrl', 'specialNotes']; //프로필 사진과 특이사항은 필수 입력사항이 아님
    const fieldsToValidate = Object.keys(formData).filter(
      (field) => !nonRequiredFileds.includes(field),
    ) as (keyof PetFormData)[];
    const isFormComplete = fieldsToValidate.every((field) => formData[field]?.toString().trim() !== '');
    setActiveBtn(isFormComplete);
  }, [formData]);

  return (
    <div>
      <PageContainer>
        <Header mode='back' title={`${initialPetName} 프로필 수정`} />

        <div className='flex h-[180px] w-full flex-col items-center justify-center gap-[1.5rem]'>
          <ProfileImgUploader image={profileImage} setImage={setProfileImage} initialImageUrl={formData.prePetImgUrl} />
          <button className='block text-caption text-gray-400' onClick={handleImageDelete}>
            프로필 사진 삭제
          </button>
        </div>
        <div className='mt-[2.4rem] flex flex-col gap-[2.4rem]'>
          <Input
            label='이름'
            placeholder='반려견 이름을 입력해주세요'
            value={formData.petName}
            onChange={(e) => handleChange('petName', e.target.value)}
          />
          <Input
            label='견종'
            placeholder='견종을 입력해주세요'
            value={petData?.subBreed.split('(')[0].trim()}
            // onChange={(e) => handleChange('subBreed', e.target.value)}
            readonly
          />
          <Input
            label='생일'
            placeholder='YYYYMMDD'
            value={formData.birthDate}
            // onChange={(e) => handleChange('birthDate', e.target.value)}
            onChange={(e) => handleBirthChange(e.target.value)}
          />
          <div>
            <div className='mb-[0.8rem] block text-body3 font-semibold text-gray-800'>성별</div>
            <div className='flex gap-2'>
              <TypeTwoButton
                text='남'
                color={formData.gender === 'M' ? 'bg-secondary' : 'bg-gray-50'}
                onClick={() => handleChange('gender', 'M')}
                fontWeight='font-normal'
              />
              <TypeTwoButton
                text='여'
                color={formData.gender === 'W' ? 'bg-secondary' : 'bg-gray-50'}
                onClick={() => handleChange('gender', 'W')}
                fontWeight='font-normal'
              />
            </div>
          </div>
          <div>
            <div className='mb-[0.8rem] block text-body3 font-semibold text-gray-800'>중성화 여부</div>
            <div className='flex gap-2'>
              <TypeTwoButton
                text='O'
                color={formData.isNeutered === 'Y' ? 'bg-secondary' : 'bg-gray-50'}
                onClick={() => handleChange('isNeutered', 'Y')}
                fontWeight='font-normal'
              />
              <TypeTwoButton
                text='X'
                color={formData.isNeutered === 'N' ? 'bg-secondary' : 'bg-gray-50'}
                onClick={() => handleChange('isNeutered', 'N')}
                fontWeight='font-normal'
              />
            </div>
          </div>
          <Input
            label='몸무게 (kg 단위)'
            placeholder='몸무게를 입력해주세요'
            value={formData.weight}
            onChange={(e) => handleChange('weight', e.target.value)}
            type='number'
          />
          <TextArea
            label='특이사항 (입질, 아픈 곳, 예민한 곳)'
            placeholder='특이사항을 입력해주세요'
            value={formData.specialNotes}
            onChange={(e) => handleChange('specialNotes', e.target.value)}
          />
          <div className='mb-[10rem] block text-body3 font-semibold text-gray-800'>
            <TypeTwoButton text='삭제하기' color='bg-secondary' onClick={handleDelete} />
          </div>
        </div>
      </PageContainer>
      <TypeOneButton
        text='저장하기'
        color={activeBtn ? 'bg-primary' : 'bg-gray-50'}
        disabled={!activeBtn}
        onClick={submitFormData}
      />
    </div>
  );
};

export default EditPetProfilePage;
