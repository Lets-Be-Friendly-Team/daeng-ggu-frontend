import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  CloseIcon,
  DogTypePicker,
  Header,
  InfoIcon,
  Input,
  InputAddress,
  PageContainer,
  ProfileImgUploader,
  ServiceCheckBox,
  TypeOneButton,
} from '@daeng-ggu/design-system';
import CameraIcon from '@daeng-ggu/design-system/components/Icons/CameraIcon';

import useGetProfileDetail from '@/hooks/queries/DesignerProfile/useGetProfileDetail';
import useUpdateProfile from '@/hooks/queries/DesignerProfile/useUpdateProfile';
import useSingleImageUpload from '@/hooks/queries/ImageUpload/useSingleImageUpload';

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
  const [profileImage, setProfileImage] = useState<File | undefined>(undefined);
  const [selectedServices, setSelectedServices] = useState<string[]>(['S1']);
  const { data: profileData } = useGetProfileDetail(designerId);
  const { mutateAsync: updateProfile } = useUpdateProfile();
  const { mutateAsync: uploadImage } = useSingleImageUpload();
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [certification] = useState<File>();

  useEffect(() => {
    if (profileData?.possibleBreeds) {
      const initialBreeds = profileData.possibleBreeds.map((breed) => breed.breedCode);
      setSelectedBreeds(initialBreeds);
    }
  }, [profileData]);

  useEffect(() => {
    if (profileData) {
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

      setSelectedServices(profileData.providedServices.map((service) => service.servicesCode));
    }
  }, [profileData]);

  const handleChange = (field: string, value: string | File | null | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const submitFormData = async () => {
    try {
      const uploadedImageUrl = profileImage ? await uploadImage(profileImage) : '';
      const uploadedCertificationUrl = certification ? await uploadImage(certification) : '';
      const updatedFormData = {
        ...formData,
        newImgUrl: uploadedImageUrl || [],
        providedService: selectedServices,
        possibleBreed: selectedBreeds,
        newCertifications: uploadedCertificationUrl ? [uploadedCertificationUrl] : [],
      };
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
          <div>
            <div className='flex items-center gap-1 mb-[0.4rem] text-body3 font-semibold text-gray-800'>
              사업자번호
              <div className='flex items-center justify-center'>
                <InfoIcon className='w-[10px] h-[10px]' />
              </div>
            </div>

            <div className='flex gap-1'>
              <div className='flex-grow'>
                <Input
                  placeholder={formData.businessNumber}
                  value={formData.businessNumber}
                  onChange={(e) => handleChange('businessNumber', e.target.value)}
                />
              </div>
              <button
                className='h-[36px] w-[90px] rounded-lg bg-gray-100 text-gray-900 text-body3 hover:bg-gray-300'
                onClick={() => {
                  console.log('사업자번호 인증하기');
                }}
              >
                인증하기
              </button>
            </div>
          </div>

          <div className='flex flex-col gap-1'>
            <div className='block text-body3 font-semibold text-gray-800'>
              서류 등록 (사업자 등록증 및 애견 미용 자격증)
            </div>
            <div className='text-gray-700 text-iconCaption'>~MB 이하의 jpg, png 파일 3개까지 업로드 가능합니다.</div>
            <div className='flex flex-wrap gap-3'>
              {formData.preCertifications.map((cert, index) => (
                <div key={index} className='relative h-[100px] w-[100px] rounded-md overflow-hidden'>
                  <img src={cert} alt={`certification-${index}`} className='h-full w-full object-cover' />
                  <div className='absolute top-0 rounded-b-md left-0 w-full bg-gradient-to-b from-gray-700 to-transparent py-4'>
                    <button
                      onClick={() => {
                        const updatedCerts = formData.preCertifications.filter((_, i) => i !== index);
                        setFormData((prev) => ({ ...prev, certifications: updatedCerts }));
                      }}
                      className='absolute top-1 right-1 flex items-center justify-center'
                    >
                      <CloseIcon className='w-[15px] h-[15px] stroke-gray-50' />
                    </button>
                  </div>
                </div>
              ))}

              <label
                htmlFor='upload-image'
                className='flex h-[100px] w-[100px] items-center justify-center rounded-md bg-gray-50 hover:cursor-pointer'
              >
                <CameraIcon className='w-[24px] h-[24px]' isCircle={false} color='#C2C7CD' />
                <input
                  id='upload-image'
                  type='file'
                  accept='image/jpeg, image/png'
                  className='hidden'
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        if (reader.result) {
                          setFormData((prev) => ({
                            ...prev,
                            certifications: [...prev.preCertifications, reader.result as string],
                          }));
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>
          </div>

          <Input
            label='경력'
            placeholder='10년 이상의 경력'
            value={formData.workExperience}
            onChange={(e) => handleChange('workExperience', e.target.value)}
          />
        </div>
      </PageContainer>
      <div className='fixed w-full' style={{ bottom: '65px' }}>
        <TypeOneButton text='저장하기' color='bg-secondary' onClick={submitFormData} />
      </div>
    </div>
  );
};

export default EditDesignerProfilePage;
