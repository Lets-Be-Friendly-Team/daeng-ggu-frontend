import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  DogTypePicker,
  Header,
  Input,
  InputAddress,
  PageContainer,
  ProfileImgUploader,
  ServiceCheckBox,
  TypeOneButton,
} from '@daeng-ggu/design-system';

import useGetProfileDetail from '@/hooks/queries/DesignerProfile/useGetProfileDetail';
import useUpdateProfile from '@/hooks/queries/DesignerProfile/useUpdateProfile';
import useMultipleImageUpload from '@/hooks/queries/ImageUpload/useMultipleImageUpload';
import useSingleImageUpload from '@/hooks/queries/ImageUpload/useSingleImageUpload';

import CertificationUploader from './components/CertificationUploader';

const EditDesignerProfilePage = () => {
  const navigate = useNavigate();
  const designerId = 4;
  const [formData, setFormData] = useState({
    designerId: designerId,
    designerName: '',
    nickname: '',
    preImgUrl: '',
    address1: '',
    address2: '',
    detailAddress: '',
    introduction: '',
    phone: '',
    businessNumber: '',
    preCertifications: [''],
    workExperience: '',
  });
  const [profileImage, setProfileImage] = useState<File>();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const { data: profileData } = useGetProfileDetail(designerId);
  const { mutateAsync: updateProfile } = useUpdateProfile();
  const { mutateAsync: uploadImage } = useSingleImageUpload();
  const { mutateAsync: uploadImages } = useMultipleImageUpload();
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [newCertifications, setNewCertifications] = useState<File[]>([]);

  useEffect(() => {
    if (profileData) {
      // 상태 초기화
      setFormData({
        designerId: profileData.designerId,
        designerName: profileData.designerName,
        nickname: profileData.nickname,
        preImgUrl: profileData.designerImgUrl,
        address1: profileData.address1,
        address2: profileData.address2,
        detailAddress: profileData.detailAddress,
        introduction: profileData.introduction,
        phone: profileData.phone,
        businessNumber: profileData.businessNumber,
        preCertifications: profileData.certifications,
        workExperience: profileData.workExperience,
      });

      // 중복 제거된 Breeds 설정
      if (profileData.possibleBreeds) {
        const initialBreeds = profileData.possibleBreeds
          .map((breed) => breed.breedCode)
          .filter((value, index, self) => self.indexOf(value) === index);
        setSelectedBreeds(initialBreeds);
      }

      // 중복 제거된 Services 설정
      if (profileData.providedServices) {
        const uniqueServices = Array.from(
          new Set(profileData.providedServices.map((service) => service.servicesCode.slice(0, 2))),
        );
        setSelectedServices(uniqueServices);
      }
    }
  }, [profileData]);

  const handleChange = (field: string, value: string | File | null | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const submitFormData = async () => {
    try {
      const uploadedImageUrl = profileImage ? await uploadImage(profileImage) : '';
      const uploadedCertificationUrls = newCertifications.length > 0 ? await uploadImages(newCertifications) : [];
      const updatedFormData = {
        designerId: formData.designerId,
        nickname: formData.nickname,
        preImgUrl: formData.preImgUrl,
        newImgUrl: uploadedImageUrl || '',
        address1: formData.address1,
        address2: formData.address2,
        detailAddress: formData.detailAddress,
        introduction: formData.introduction,
        phone: formData.phone,
        providedServices: selectedServices.includes('S1') ? selectedServices : ['S1', ...selectedServices],
        possibleBreed: selectedBreeds,
        preCertifications: formData.preCertifications,
        newCertifications: uploadedCertificationUrls,
        workExperience: formData.workExperience,
      };

      console.log('전송 데이터', updatedFormData);
      await updateProfile(updatedFormData);

      navigate('/profile');
    } catch (error) {
      alert('프로필 저장에 실패했습니다.');
      console.error(error);
    }
  };

  const handleImageDelete = () => {
    setProfileImage(undefined);
    setFormData((prev) => ({ ...prev, preImgUrl: '' }));
  };

  return (
    <div className='pb-[185px]'>
      <PageContainer>
        <Header mode='back' title='내 프로필 수정' />
        <div className='flex h-[180px] w-full flex-col items-center justify-center gap-[15px]'>
          <ProfileImgUploader image={profileImage} setImage={setProfileImage} initialImageUrl={formData.preImgUrl} />
          <button className='block text-caption text-gray-400' onClick={handleImageDelete}>
            프로필 사진 삭제
          </button>
        </div>
        <div className='flex flex-col gap-5'>
          <Input
            label='이름'
            placeholder={formData.designerName}
            value={formData.designerName}
            onChange={(e) => handleChange('designerName', e.target.value)}
          />
          <InputAddress
            label='주소'
            addressForm={{
              address1: formData.address1,
              address2: formData.address2,
            }}
            setAddressForm={({ address1, address2 }) => {
              handleChange('address1', address1);
              handleChange('address2', address2);
            }}
            detailAddr={formData.detailAddress}
            setDetailAddr={(value) => handleChange('detailAddress', value)}
          />
          <Input
            label='미용실 소개'
            placeholder={formData.introduction}
            value={formData.introduction}
            onChange={(e) => handleChange('introduction', e.target.value)}
          />
          <Input
            label='연락처'
            placeholder={formData.phone}
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
          <div className='flex flex-col gap-1'>
            <div className='mb-[0.4rem] block text-body3 font-semibold text-gray-800'>제공 서비스</div>
            <ServiceCheckBox
              initialSelectedItems={selectedServices}
              onChange={(values) => setSelectedServices(values)}
            />
          </div>
          <DogTypePicker
            type='checkbox'
            selectedValues={selectedBreeds}
            onChange={(values) => setSelectedBreeds(values)}
          />
          <Input
            label='닉네임'
            placeholder={formData.nickname}
            value={formData.nickname}
            onChange={(e) => handleChange('nickname', e.target.value)}
          />

          <CertificationUploader
            formData={formData}
            setFormData={setFormData}
            setNewCertifications={setNewCertifications}
          />

          <Input
            label='경력'
            placeholder='10년 이상의 경력'
            value={formData.workExperience}
            onChange={(e) => handleChange('workExperience', e.target.value)}
          />
        </div>
      </PageContainer>
      <TypeOneButton text='저장하기' color='bg-secondary' onClick={submitFormData} />
    </div>
  );
};

export default EditDesignerProfilePage;
