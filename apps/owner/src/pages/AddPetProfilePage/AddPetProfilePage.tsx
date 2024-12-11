import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  DogTypePicker,
  Header,
  Input,
  PageContainer,
  ProfileImgUploader,
  TextArea,
  TypeOneButton,
  TypeTwoButton,
} from '@daeng-ggu/design-system';

import SubBreedSelector from '@/components/SubBreedSelector/SubBreedSelector';
import { breedList } from '@/constants/breedList';

interface PetData {
  petName: string;
  newPetImgFile: File | null;
  majorBreedCode: string;
  // majorBreed: string;
  subBreedCode: string;
  // subBreed: string;
  birthDate: string;
  gender: string;
  isNeutered: string;
  weight: string;
  specialNotes: string;
}

const petData: PetData = {
  //   petId: 1, // 반려견 아이디
  petName: '', // 반려견 이름
  newPetImgFile: null, // 신규 반려견 이미지 파일 (실제로는 파일 업로드와 관련된 객체이므로 더미 데이터에서는 null로 설정)
  // prePetImgUrl: '', // 변경전 이미지 Url
  majorBreedCode: '', // 견종 대분류 코드 (예: '01' = 소형견)
  // majorBreed: '', // 견종 대분류명
  subBreedCode: '', // 견종 소분류 코드 (예: '0101' = 푸들)
  // subBreed: '', // 견종 소분류명
  birthDate: '', // 생년월일 (YYYYMMDD)
  gender: '', // 성별 (M = 수컷, W = 암컷)
  isNeutered: '', // 중성화 여부 (Y = 중성화, N = 미중성화)
  weight: '', // 몸무게 (kg)
  specialNotes: '', // 특이사항
};
const AddPetProfilePage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<PetData>(petData);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [selectedBreed, setSelectedBreed] = useState<string[]>([]);
  const [activeBtn, setActiveBtn] = useState(false);

  // 견종 대분류 업데이트
  const handleChangeMajorBreed = (values: string[]) => {
    console.log(values[0]);
    setSelectedBreed(values);
    if (values.length > 0) {
      const selectedValue = values[0];
      const breedData = breedList[selectedValue];

      setFormData((prev) => ({
        ...prev,
        // majorBreed: breedData.name,
        majorBreedCode: breedData.code,
        subBreedCode: '',
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        // majorBreed: '',
        majorBreedCode: '',
        subBreedCode: '',
      }));
    }
  };

  // 견종 소분류 업데이트
  const handleChangeSubBreed = (subBreedCode: string) => {
    setFormData((prev) => ({ ...prev, subBreedCode }));
  };
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

      alert('반려견 프로필이 등록되었습니다.');
      navigate(-1);
    } catch (error) {
      alert('반려견 프로필 등록에 실패했습니다.');
      console.error(error);
    }
  };
  const handleImageDelete = () => {
    setProfileImage(null);
    // setFormData((prev) => ({ ...prev, prePetImgUrl: '' }));
  };

  //문자입력 방지(숫자만 입력) 및 입력 길이 제한
  //생일 입력시 사용
  const handleNumChange = (_e: ChangeEvent<HTMLInputElement>, maxLength: number) => {
    const { name, value } = _e.target;
    const result = value.replace(/\D/g, '');
    const trimmedResult = result.slice(0, maxLength); // 최대 길이만큼 자르기
    setFormData((prev) => ({
      ...prev,
      [name]: trimmedResult,
    }));
  };

  // 필수 정보 입력되면 버튼 활성화
  useEffect(() => {
    console.log(formData);
    const nonRequiredFileds = ['newPetImgFile', 'specialNotes']; //프로필 사진과 특이사항은 필수 입력사항이 아님
    const fieldsToValidate = Object.keys(formData).filter(
      (field) => !nonRequiredFileds.includes(field),
    ) as (keyof PetData)[];
    const isFormComplete = fieldsToValidate.every((field) => formData[field]?.toString().trim() !== '');
    setActiveBtn(isFormComplete);
  }, [formData]);

  return (
    <div className='pb-[10rem]'>
      <PageContainer>
        <Header mode='back' title={`반려견 프로필 등록`} />
        <div className='flex h-[180px] w-full flex-col items-center justify-center gap-[1.5rem]'>
          <ProfileImgUploader image={profileImage} setImage={setProfileImage} />
          <button className='block text-caption text-gray-400' onClick={handleImageDelete}>
            프로필 사진 삭제
          </button>
        </div>
        <div className='mt-[2.4rem] flex flex-col gap-[2.4rem]'>
          <Input
            label='이름'
            placeholder='반려견 이름 입력'
            value={formData.petName}
            onChange={(e) => handleChange('petName', e.target.value)}
          />
          <div className='flex flex-col gap-y-[0.8rem]'>
            <div className='text-body3 font-semibold text-gray-800'>견종</div>
            <DogTypePicker type='radio' selectedValues={selectedBreed} onChange={handleChangeMajorBreed} />
            <SubBreedSelector options={breedList[selectedBreed[0]]?.sub} onChange={handleChangeSubBreed} />
          </div>
          <Input
            label='생일'
            placeholder='YYYYMMDD'
            value={formData.birthDate}
            name='birthDate'
            onChange={(e) => handleNumChange(e, 8)}
          />
          <div>
            <div className='mb-[0.8rem] block text-body3 font-semibold text-gray-800'>성별</div>
            <div className='flex gap-2'>
              <TypeTwoButton
                text='남'
                color={formData.gender === 'M' ? 'bg-secondary' : 'bg-gray-50'}
                fontWeight='font-medium'
                onClick={() => handleChange('gender', 'M')}
              />
              <TypeTwoButton
                text='여'
                color={formData.gender === 'W' ? 'bg-secondary' : 'bg-gray-50'}
                fontWeight='font-medium'
                onClick={() => handleChange('gender', 'W')}
              />
            </div>
          </div>
          <div>
            <div className='mb-[0.8rem] block text-body3 font-semibold text-gray-800'>중성화 여부</div>
            <div className='flex gap-2'>
              <TypeTwoButton
                text='O'
                color={formData.isNeutered === 'Y' ? 'bg-secondary' : 'bg-gray-50'}
                fontWeight='font-medium'
                onClick={() => handleChange('isNeutered', 'Y')}
              />
              <TypeTwoButton
                text='X'
                color={formData.isNeutered === 'N' ? 'bg-secondary' : 'bg-gray-50'}
                fontWeight='font-medium'
                onClick={() => handleChange('isNeutered', 'N')}
              />
            </div>
          </div>
          <Input
            label='몸무게 (kg 단위)'
            placeholder='예시: 5'
            value={formData.weight}
            onChange={(e) => handleChange('weight', e.target.value)}
            type='number'
          />
          <TextArea
            label='특이사항 (입질, 아픈 곳, 예민한 곳)'
            placeholder='특이사항 입력'
            value={formData.specialNotes}
            onChange={(e) => handleChange('specialNotes', e.target.value)}
            maxLength={200}
          />
        </div>
      </PageContainer>
      {/* <div className='fixed w-full' style={{ bottom: '7.5rem' }}> */}
      <TypeOneButton
        text='등록하기'
        onClick={submitFormData}
        color={activeBtn ? 'bg-primary' : 'bg-gray-50'}
        disabled={!activeBtn}
      />
      {/* </div> */}
    </div>
  );
};

export default AddPetProfilePage;
