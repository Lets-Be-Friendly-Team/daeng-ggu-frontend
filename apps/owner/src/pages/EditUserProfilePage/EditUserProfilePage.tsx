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
  preCustomerImgUrl: 'https://via.placeholder.com/100',
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
  const navigateBack = () => {
    navigate(-1);
  };

  const [formData, setFormData] = useState(data);

  const handleChange = (field: string, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const submitFormData = () => {
    try {
      const payload = {
        ...formData,
        address: `${formData.address1} ${formData.address2} ${formData.detailAddress}`,
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
  return (
    <>
      <PageContainer>
        <Header mode='back' title='내 프로필 수정' onClick={navigateBack} />
        <div className='flex h-[180px] w-full flex-col items-center justify-center gap-[15px]'>
          <ProfileImgUploader />
          <button className='block text-caption text-gray-400' onClick={() => handleChange('newCustomerImgFile', null)}>
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
                color={formData.gender === 'male' ? 'bg-secondary' : ''}
                onClick={() => handleChange('gender', 'male')}
              />
              <TypeTwoButton
                text='여'
                color={formData.gender === 'female' ? 'bg-secondary' : ''}
                onClick={() => handleChange('gender', 'female')}
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
      <div className='fixed w-full' style={{ bottom: '65px' }}>
        <TypeOneButton text='저장하기' color='bg-secondary' onClick={submitFormData} />
      </div>
    </>
  );
};

export default EditUserProfilePage;
