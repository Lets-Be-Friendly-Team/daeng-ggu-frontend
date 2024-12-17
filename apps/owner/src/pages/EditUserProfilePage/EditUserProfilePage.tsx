import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router';
import {
  Header,
  Input,
  InputAddress,
  PageContainer,
  ProfileImgUploader,
  TypeOneButton,
  TypeTwoButton,
} from '@daeng-ggu/design-system';

import postImage from '@/apis/image/postImage';
import useGetProfileDetail from '@/hooks/queries/CustomerProfile/useGetProfileDetail';
// import useSingleImageUpload from '@/hooks/queries/ImageUpload/useSingleImageUpload';
// import useUpdateProfile from '@/hooks/queries/CustomerProfile/useUpdateProfile';
// import usePostImage from '@/hooks/queries/Image/usePostImage';

const EditUserProfilePage = () => {
  // const navigate = useNavigate();
  const customerId = 2;
  const { data: profileData } = useGetProfileDetail(customerId);
  // const updateProfileMutation = useUpdateProfile();
  // const { mutateAsync: uploadImage } = usePostImage();

  const [formData, setFormData] = useState({
    customerId: customerId,
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

  // const singleImageUpload = useSingleImageUpload;

  const submitFormData = async () => {
    try {
      const formPayload = new FormData();

      // 이미지 업로드가 있을 경우
      if (profileImage) {
        const imageFormData = new FormData();
        imageFormData.append('img', profileImage);

        // 이미지 업로드 API 호출
        const uploadResponse = await postImage(imageFormData);
        console.log(uploadResponse);
        if (uploadResponse.status === 'SUCCESS') {
          formData.customerImgUrl = uploadResponse.data; // 업로드된 이미지 URL 반영
          // setFormData((prev) => ({
          //   ...prev,
          //   customerImgUrl: uploadResponse.data, // 업로드된 이미지 URL 반영
          // }));
        } else {
          throw new Error('이미지 업로드 실패');
        }
      }
      // JSON 데이터를 Blob으로 변환하여 지정된 key로 추가
      // const jsonData = {
      //   customerId: formData.customerId,
      //   customerName: formData.customerName,
      //   birthDate: formData.birthDate,
      //   gender: formData.gender,
      //   phone: formData.phone,
      //   nickname: formData.nickname,
      //   address1: formData.address1,
      //   address2: formData.address2,
      //   detailAddress: formData.detailAddress,
      //   preCustomerImgUrl: formData.customerImgUrl,
      // };

      // formPayload.append(
      //   'data', // 서버에서 지정한 key
      //   new Blob([JSON.stringify(jsonData)], {
      //     type: 'application/json', // JSON 타입 명시
      //   }),
      // );

      console.log('Final FormData:', [...formPayload.entries()]);

      // updateProfileMutation.mutate(formPayload, {
      //   onSuccess: () => {
      //     alert('업데이트 성공');
      //     navigate(-1);
      //   },
      //   onError: (error) => {
      //     alert('오류 발생');
      //     console.error(error);
      //   },
      // });
    } catch (error) {
      alert('프로필 저장에 실패했습니다.');
      console.error(error);
    }
  };

  // const submitFormData = async () => {
  //   try {
  //     if (profileImage) {

  //       console.log(profileImage);
  //       const imageFormData = new FormData();
  //       imageFormData.append('img', profileImage);

  //       // 이미지 업로드 API 호출
  //       const uploadResponse = await postImage(imageFormData);

  //       if (uploadResponse.status === 'SUCCESS') {
  //         console.log('Uploaded Image URL:', uploadResponse.data);
  //         alert(`이미지 업로드 성공: ${uploadResponse.data}`);
  //       } else {
  //         alert(`이미지 업로드 실패: ${uploadResponse.message}`);
  //       }
  //     } else {
  //       alert('업로드할 이미지가 없습니다.');
  //     }
  //   } catch (error) {
  //     console.error('Upload Error:', error);
  //     alert('이미지 업로드 중 오류가 발생했습니다.');
  //   }
  // };

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
