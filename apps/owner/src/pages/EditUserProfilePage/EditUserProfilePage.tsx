import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Header,
  Input,
  InputAddress,
  PageContainer,
  ProfileImgUploader,
  TypeOneButton,
  TypeTwoButton,
} from '@daeng-ggu/design-system';

const data = {
  customerId: 2,
  customerName: '김장미',
  newCustomerImgFile: '',
  preCustomerImgUrl: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/jangmi.jpg',
  birthDate: '19900520',
  gender: 'female',
  phone: '010-1234-5678',
  nickname: '장미',
  address1: '서울 강남구 대치동',
  address2: '서울 강남구 선릉로 428 (대치동)',
  detailAddress: '402호',
};
const EditUserProfilePage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(data);
  const [profileImage, setProfileImage] = useState<File | undefined>(undefined);

  const handleChange = (field: string, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const submitFormData = () => {
    try {
      const payload = {
        ...formData,
        address: `${formData.address1} ${formData.address2} ${formData.detailAddress}`,
        newCustomerImgFile: profileImage || '',
      };

      // 데이터를 localStorage에 저장 (테스트용)
      localStorage.setItem('userProfile', JSON.stringify(payload));

      alert('프로필이 저장되었습니다.');
      navigate(-1);
    } catch (error) {
      alert('프로필 저장에 실패했습니다.');
      console.error(error);
    }
  };

  const handleImageDelete = () => {
    setProfileImage(undefined);
    setFormData((prev) => ({ ...prev, preCustomerImgUrl: '' }));
  };
  return (
    <div className='pb-[185px]'>
      <PageContainer>
        <Header mode='back' title='내 프로필 수정' />
        <div className='flex h-[180px] w-full flex-col items-center justify-center gap-[15px]'>
          <ProfileImgUploader
            image={profileImage}
            setImage={setProfileImage}
            initialImageUrl={formData.preCustomerImgUrl}
          />
          <button className='block text-caption text-gray-400' onClick={handleImageDelete}>
            프로필 사진 삭제
          </button>
        </div>
        <div className='flex flex-col gap-5'>
          <Input
            label='이름'
            placeholder={data.customerName}
            value={formData.customerName}
            onChange={(e) => handleChange('customerName', e.target.value)}
          />
          <Input
            label='생년월일'
            placeholder={data.birthDate}
            value={formData.birthDate}
            onChange={(e) => handleChange('birthDate', e.target.value)}
          />
          <div>
            <div className='mb-[0.4rem] block text-body3 font-semibold text-gray-800'>성별</div>
            <div className='flex gap-1'>
              <TypeTwoButton
                text='남'
                color={formData.gender === 'male' ? 'bg-secondary' : 'bg-gray-50'}
                fontWeight='font-medium'
                onClick={() => handleChange('gender', 'male')}
              />
              <TypeTwoButton
                text='여'
                color={formData.gender === 'female' ? 'bg-secondary' : 'bg-gray-50'}
                onClick={() => handleChange('gender', 'female')}
                fontWeight='font-medium'
              />
            </div>
          </div>
          <Input
            label='휴대전화'
            placeholder={data.phone}
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
          <Input
            label='닉네임'
            placeholder={data.nickname}
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
      <div className='fixed w-full' style={{ bottom: '7.5rem' }}>
        <TypeOneButton text='저장하기' color='bg-secondary' onClick={submitFormData} />
      </div>
    </div>
  );
};

export default EditUserProfilePage;
