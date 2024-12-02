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

const EditPetProfilePage = () => {
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate(-1);
  };
  const onClick = () => {};
  const petData = {
    petId: 1, // 반려견 아이디
    petName: '장군이', // 반려견 이름
    newPetImgFile: null, // 신규 반려견 이미지 파일 (실제로는 파일 업로드와 관련된 객체이므로 더미 데이터에서는 null로 설정)
    prePetImgUrl: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/janggun.jpg', // 변경전 이미지 Url
    majorBreedCode: '01', // 견종 대분류 코드 (예: '01' = 소형견)
    majorBreed: '소형견', // 견종 대분류명
    subBreedCode: '0101', // 견종 소분류 코드 (예: '0101' = 푸들)
    subBreed: '푸들', // 견종 소분류명
    birthDate: '20220101', // 생년월일 (YYYYMMDD)
    gender: 'M', // 성별 (M = 수컷, W = 암컷)
    isNeutered: 'Y', // 중성화 여부 (Y = 중성화, N = 미중성화)
    weight: 6.5, // 몸무게 (kg)
    specialNotes: '활발하고 사람을 좋아함', // 특이사항
  };

  return (
    <>
      <PageContainer>
        <Header mode='back' title={`${petData.petName} 프로필 수정`} onClick={navigateBack} />
        <div className='flex h-[180px] w-full flex-col items-center justify-center gap-[15px]'>
          <ProfileImgUploader />
          <button className='block text-caption text-gray-400'>프로필 사진 삭제</button>
        </div>
        <div className='flex flex-col gap-5'>
          <Input label='이름' placeholder={petData.petName} />
          <Input label='견종' placeholder={petData.subBreed} />
          <Input label='생일' placeholder={petData.birthDate} />
          <div>
            <div className='mb-[0.4rem] block text-body3 font-semibold text-gray-800'>성별</div>
            <div className='flex gap-1'>
              <TypeTwoButton text='남' color={petData.gender === 'M' ? 'bg-secondary' : ''} />
              <TypeTwoButton text='여' color={petData.gender === 'Y' ? 'bg-secondary' : ''} />
            </div>
          </div>
          <div>
            <div className='mb-[0.4rem] block text-body3 font-semibold text-gray-800'>중성화 여부</div>
            <div className='flex gap-1'>
              <TypeTwoButton text='O' color={petData.isNeutered === 'Y' ? 'bg-secondary' : ''} />
              <TypeTwoButton text='X' color={petData.isNeutered === 'N' ? 'bg-secondary' : ''} />
            </div>
          </div>
          <Input label='몸무게 (kg 단위)' placeholder={petData.weight} />
          <TextArea label='특이사항 (입질, 아픈 곳, 예민한 곳)' placeholder={petData.specialNotes} />
        </div>
      </PageContainer>
      <div className='fixed w-full' style={{ bottom: '65px' }}>
        <TypeOneButton text='저장하기' color='bg-secondary' onClick={onClick} />
      </div>
    </>
  );
};

export default EditPetProfilePage;
