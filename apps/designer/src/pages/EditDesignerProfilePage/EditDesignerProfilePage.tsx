import { useState } from 'react';
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

const data = {
  designerId: '1',
  designerName: '김장미',
  preImgUrl: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/jangmi+hair+salon.jpg',
  address1: '서울특별시 강남구 대치동 889-41',
  address2: '서울특별시 강남구 선릉로 428',
  detailAddress: '멀티캠퍼스 4층',
  introduction: '경험이 풍부한 전문 디자이너입니다.',
  phone: '010-2222-3333',
  providedServices: ['S1', 'S2'],
  isVerified: 'Y',
  businessNumber: '123-45-67890',
  businessIsVerified: 'Y',
  certifications: ['https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/jangmi-certificate1.jpg'],
  workExperience: '10년 이상의 미용 경력을 보유',
  newImgFile: '', // Base64로 변환된 파일
  nickname: '장미 애견 미용실',
  possibleBreeds: [
    {
      breedCode: 'P1',
      codeDesc: '소형견 (Small Breeds)',
    },
    {
      breedCode: 'P2',
      codeDesc: '중형견 (Medium Breeds)',
    },
    {
      breedCode: 'P3',
      codeDesc: '대형견 (Large Breeds)',
    },
  ],
  certificationsFileList: [],
};
const EditDesignerProfilePage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(data);
  const [profileImage, setProfileImage] = useState<File | undefined>(undefined);
  const [selectedServices, setSelectedServices] = useState<string[]>(data.providedServices);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>(
    data.possibleBreeds.map((breed) => {
      if (breed.breedCode === 'P1') return '소형견';
      if (breed.breedCode === 'P2') return '중형견';
      if (breed.breedCode === 'P3') return '대형견';
      return '특수견';
    }),
  );
  const handleChange = (field: string, value: string | File | null | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const submitFormData = () => {
    try {
      const payload = {
        ...formData,
        address: `${formData.address1} ${formData.address2} ${formData.detailAddress}`,
        newImgFile: profileImage || '',
        providedServices: selectedServices,
        possibleBreed: selectedBreeds,
      };

      // 데이터를 localStorage에 저장 (테스트용)
      localStorage.setItem('designerProfile', JSON.stringify(payload));

      alert('프로필이 저장되었습니다.');
      navigate(-1);
    } catch (error) {
      alert('프로필 저장에 실패했습니다.');
      console.error(error);
    }
  };

  const handleImageDelete = () => {
    setProfileImage(null);
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
            placeholder={data.designerName}
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
            placeholder={data.introduction}
            value={formData.introduction}
            onChange={(e) => handleChange('introduction', e.target.value)}
          />
          <Input
            label='연락처'
            placeholder={data.phone}
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
            placeholder={data.nickname}
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
                  placeholder={data.businessNumber}
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
              {formData.certifications.map((cert, index) => (
                <div key={index} className='relative h-[100px] w-[100px] rounded-md overflow-hidden'>
                  <img src={cert} alt={`certification-${index}`} className='h-full w-full object-cover' />
                  <div className='absolute top-0 rounded-b-md left-0 w-full bg-gradient-to-b from-gray-700 to-transparent py-4'>
                    <button
                      onClick={() => {
                        const updatedCerts = formData.certifications.filter((_, i) => i !== index);
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
                            certifications: [...prev.certifications, reader.result as string],
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
