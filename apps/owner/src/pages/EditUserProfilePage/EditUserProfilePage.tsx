import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Header,
  Input,
  InputAddress,
  PageContainer,
  ProfileImgUploader,
  TypeOneButton,
  TypeTwoButton,
} from '@daeng-ggu/design-system';

// 실제 컴포넌트 경로는 프로젝트 구조에 맞게 변경
import useGetProfileDetail from '@/hooks/queries/CustomerProfile/useGetProfileDetail';
import useUpdateProfile from '@/hooks/queries/CustomerProfile/useUpdateProfile';
import useSingleImageUpload from '@/hooks/queries/ImageUpload/useSingleImageUpload';
import useOwnerIdStore from '@/stores/useOwnerIdStore';

const EditUserProfilePage = () => {
  const navigate = useNavigate();
  // const customerId = 2;
  const { ownerId } = useOwnerIdStore();
  const { data: profileData } = useGetProfileDetail(ownerId);
  const { mutateAsync: updateProfile } = useUpdateProfile();
  const { mutateAsync: uploadImage } = useSingleImageUpload();

  const [formData, setFormData] = useState({
    customerId: ownerId,
    customerName: '',
    customerImgUrl: '',
    birthDate: '',
    gender: '',
    phone: '',
    nickname: '',
    address1: '',
    address2: '',
    detailAddress: '',
  });
  const [profileImage, setProfileImage] = useState<File>();

  useEffect(() => {
    if (profileData) {
      setFormData(profileData);
      setProfileImage(undefined);
    }
  }, [profileData]);

  const handleChange = (field: string, value: string | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const submitFormData = async () => {
    try {
      const uploadedImageUrl = profileImage ? await uploadImage(profileImage) : '';
      const updatedFormData = {
        customerId: ownerId,
        customerName: formData.customerName,
        preCustomerImgUrl: formData.customerImgUrl,
        newCustomerImgUrl: uploadedImageUrl,
        birthDate: formData.birthDate,
        gender: formData.gender,
        phone: formData.phone,
        nickname: formData.nickname,
        address1: formData.address1,
        address2: formData.address2,
        detailAddress: formData.detailAddress,
      };

      await updateProfile(updatedFormData);

      navigate('/profile'); // 수정 완료 후 이동할 경로에 맞춰 변경
    } catch (error) {
      alert('프로필 저장에 실패했습니다.');
      console.error(error);
    }
  };

  const handleImageDelete = () => {
    setProfileImage(undefined);
    setFormData((prev) => ({ ...prev, customerImgUrl: '' }));
  };

  return (
    <div>
      <PageContainer>
        <Header mode='back' title='내 프로필 수정' />
        <div className='flex h-[180px] w-full flex-col items-center justify-center gap-[15px]'>
          <ProfileImgUploader
            image={profileImage}
            setImage={setProfileImage}
            initialImageUrl={formData.customerImgUrl}
          />
          <button className='block text-caption text-gray-400' onClick={handleImageDelete}>
            프로필 사진 삭제
          </button>
        </div>
        <div className='flex flex-col gap-5'>
          <Input
            label='이름'
            placeholder='이름을 입력하세요'
            value={formData.customerName}
            onChange={(e) => handleChange('customerName', e.target.value)}
          />
          <Input
            label='생년월일'
            placeholder='생년월일을 입력하세요'
            value={formData.birthDate}
            onChange={(e) => handleChange('birthDate', e.target.value)}
          />
          <div>
            <div className='mb-[0.4rem] block text-body3 font-semibold text-gray-800'>성별</div>
            <div className='flex gap-1'>
              <TypeTwoButton
                text='남'
                color={formData.gender === 'M' ? 'bg-secondary' : 'bg-gray-50'}
                fontWeight='font-medium'
                onClick={() => handleChange('gender', 'M')}
              />
              <TypeTwoButton
                text='여'
                color={formData.gender === 'F' ? 'bg-secondary' : 'bg-gray-50'}
                onClick={() => handleChange('gender', 'F')}
                fontWeight='font-medium'
              />
            </div>
          </div>
          <Input
            label='휴대전화'
            placeholder='휴대전화를 입력하세요'
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
          <Input
            label='닉네임'
            placeholder='닉네임을 입력하세요'
            value={formData.nickname}
            onChange={(e) => handleChange('nickname', e.target.value)}
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
        </div>
      </PageContainer>
      <TypeOneButton text='저장하기' color='bg-secondary' onClick={submitFormData} />
    </div>
  );
};

export default EditUserProfilePage;
