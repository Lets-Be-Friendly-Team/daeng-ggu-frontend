import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Header,
  Input,
  PageContainer,
  ProfileImgUploader,
  TextArea,
  TypeOneButton,
  TypeTwoButton,
} from '@daeng-ggu/design-system';

const petData = {
  //   petId: 1, // 반려견 아이디
  petName: '', // 반려견 이름
  newPetImgFile: null, // 신규 반려견 이미지 파일 (실제로는 파일 업로드와 관련된 객체이므로 더미 데이터에서는 null로 설정)
  prePetImgUrl: '', // 변경전 이미지 Url
  majorBreedCode: '', // 견종 대분류 코드 (예: '01' = 소형견)
  majorBreed: '', // 견종 대분류명
  subBreedCode: '', // 견종 소분류 코드 (예: '0101' = 푸들)
  subBreed: '', // 견종 소분류명
  birthDate: '', // 생년월일 (YYYYMMDD)
  gender: '', // 성별 (M = 수컷, W = 암컷)
  isNeutered: '', // 중성화 여부 (Y = 중성화, N = 미중성화)
  weight: '', // 몸무게 (kg)
  specialNotes: '', // 특이사항
};
const AddPetProfilePage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(petData);
  const [profileImage, setProfileImage] = useState<File | undefined>(undefined);
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
    setFormData((prev) => ({ ...prev, prePetImgUrl: '' }));
  };

  return (
    <div className='pb-[185px]'>
      <PageContainer>
        <Header mode='back' title={`반려견 프로필 등록`} />
        <div className='flex h-[180px] w-full flex-col items-center justify-center gap-[15px]'>
          <ProfileImgUploader image={profileImage} setImage={setProfileImage} initialImageUrl={formData.prePetImgUrl} />
          <button className='block text-caption text-gray-400' onClick={handleImageDelete}>
            프로필 사진 삭제
          </button>
        </div>
        <div className='flex flex-col gap-5'>
          <Input
            label='이름'
            placeholder='이름을 입력하세요.'
            value={formData.petName}
            onChange={(e) => handleChange('petName', e.target.value)}
          />
          <Input
            label='견종'
            placeholder='견종을 입력하세요.'
            value={formData.subBreed}
            onChange={(e) => handleChange('subBreed', e.target.value)}
          />
          <Input
            label='생일'
            placeholder='예시: 20240101'
            value={formData.birthDate}
            onChange={(e) => handleChange('birthDate', e.target.value)}
          />
          <div>
            <div className='mb-[0.4rem] block text-body3 font-semibold text-gray-800'>성별</div>
            <div className='flex gap-1'>
              <TypeTwoButton
                text='남'
                color={formData.gender === 'M' ? 'bg-secondary' : ''}
                onClick={() => handleChange('gender', 'M')}
              />
              <TypeTwoButton
                text='여'
                color={formData.gender === 'W' ? 'bg-secondary' : ''}
                onClick={() => handleChange('gender', 'W')}
              />
            </div>
          </div>
          <div>
            <div className='mb-[0.4rem] block text-body3 font-semibold text-gray-800'>중성화 여부</div>
            <div className='flex gap-1'>
              <TypeTwoButton
                text='O'
                color={formData.isNeutered === 'Y' ? 'bg-secondary' : ''}
                onClick={() => handleChange('isNeutered', 'Y')}
              />
              <TypeTwoButton
                text='X'
                color={formData.isNeutered === 'N' ? 'bg-secondary' : ''}
                onClick={() => handleChange('isNeutered', 'N')}
              />
            </div>
          </div>
          <Input
            label='몸무게 (kg 단위)'
            placeholder='예시: 5'
            value={formData.weight}
            onChange={(e) => handleChange('weight', e.target.value)}
          />
          <TextArea
            label='특이사항 (입질, 아픈 곳, 예민한 곳)'
            placeholder='특이사항을 입력해주세요.'
            value={formData.specialNotes}
            onChange={(e) => handleChange('specialNotes', e.target.value)}
          />
        </div>
      </PageContainer>
      <div className='fixed w-full' style={{ bottom: '65px' }}>
        <TypeOneButton text='저장하기' color='bg-secondary' onClick={submitFormData} />
      </div>
    </div>
  );
};

export default AddPetProfilePage;