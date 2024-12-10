import { useEffect, useState } from 'react';
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

import useGetProfileDetail from '@/hooks/queries/CustomerProfile/useGetProfileDetail';
import useUpdateProfile from '@/hooks/queries/CustomerProfile/useUpdateProfile';

const EditUserProfilePage = () => {
  const navigate = useNavigate();
  const customerId = 2;
  const { data: profileData } = useGetProfileDetail(customerId);
  const updateProfileMutation = useUpdateProfile();
  const [formData, setFormData] = useState({
    customerId: 0,
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
  const [profileImage, setProfileImage] = useState<File | undefined>(undefined);

  useEffect(() => {
    if (profileData) {
      setFormData(profileData);
      setProfileImage(undefined);
    }
  }, [profileData]);

  const handleChange = (field: string, value: string | File | null | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const submitFormData = () => {
    try {
      // const payload = {
      //   ...formData,
      //   address: `${formData.address1} ${formData.address2} ${formData.detailAddress}`,
      //   newCustomerImgFile: profileImage || '',
      //   preCustomerImgUrl: formData.customerImgUrl,
      // };

      const formPayload = new FormData();
      formPayload.append('customerId', formData.customerId.toString());
      formPayload.append('customerName', formData.customerName);
      formPayload.append('birthDate', formData.birthDate);
      formPayload.append('gender', formData.gender);
      formPayload.append('phone', formData.phone);
      formPayload.append('nickname', formData.nickname);
      formPayload.append('address1', formData.address1);
      formPayload.append('address2', formData.address2);
      formPayload.append('detailAddress', formData.detailAddress);
      formPayload.append('preCustomerImgUrl', formData.customerImgUrl);

      // 파일이 있을 경우에만 append
      if (profileImage) {
        formPayload.append('newCustomerImgFile', profileImage);
      } else {
        // 파일이 없다면 빈 문자열 대신 서버가 이를 허용하는지 확인 필요
        formPayload.append('newCustomerImgFile', '');
      }
      updateProfileMutation.mutate(formPayload, {
        onSuccess: () => {
          alert('업데이트 성공');
          navigate(-1);
        },
        onError: (error) => {
          alert('오류 발생');
          console.error(error);
        },
      });
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
    <div className='pb-[185px]'>
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
      <div className='fixed w-full' style={{ bottom: '7.5rem' }}>
        <TypeOneButton text='저장하기' color='bg-secondary' onClick={submitFormData} />
      </div>
    </div>
  );
};

export default EditUserProfilePage;
