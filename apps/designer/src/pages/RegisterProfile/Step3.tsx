import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CloseIcon, Input } from '@daeng-ggu/design-system';
import CameraIcon from '@daeng-ggu/design-system/components/Icons/CameraIcon';
import { useToast } from '@daeng-ggu/shared';

// import { DesignerData } from './RegisterProfileData';
import useVerifyBusiness from '@/hooks/queries/VerifyBusiness/useVerifyBusiness';
import useProfileStore from '@/stores/useProfileStore';

export interface BusinessForm {
  businessNumber: string;
  representativeName: string;
  startDate: string;
}

const Step3 = ({ setActiveBtn }: { setActiveBtn: Dispatch<SetStateAction<boolean>> }) => {
  const { showToast } = useToast();
  const { profileData, setProfileData, fileData, setFileData } = useProfileStore();
  const { businessNumber } = profileData;
  const [businessData, setBusinessData] = useState<BusinessForm>({
    businessNumber: '',
    representativeName: '',
    startDate: '',
  });
  const [desc, setDesc] = useState('');
  // 사업자 인증을 위한 query hook
  const { isLoading, isError, refetch } = useVerifyBusiness({
    ...businessData,
    businessNumber: businessData.businessNumber, // 동적 값
    representativeName: businessData.representativeName,
    startDate: businessData.startDate,
  });

  const handleChange = (field: keyof BusinessForm, value: string) => {
    if (field === 'businessNumber') {
      setProfileData({ businessNumber: value });
    }
    setBusinessData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    setActiveBtn(true);
  }, [setActiveBtn]);

  /**to do
   * 사업자 인증 버튼 클릭시 핸들러
   */
  const handleVerify = async () => {
    if (!businessData.businessNumber || !businessData.representativeName || !businessData.startDate) {
      showToast({ message: '모든 값을 입력해주세요', type: 'error' });
      return;
    }
    try {
      // // queryKey 생성
      // const queryKey = BUSINESS_QUERY_KEYS.GET_VERIFY_BUSINESS(
      //   businessData.businessNumber,
      //   businessData.representativeName,
      //   businessData.startDate,
      // );

      // // queryKey를 명시적으로 타입 단언
      // queryClient.invalidateQueries(queryKey as any); // 또는 queryKey as string[]

      const response = await refetch(); // useVerifyBusiness의 query 재실행
      if (response.data?.data === 'Y') {
        // alert('사업자 인증 성공!');
        showToast({ message: '사업자 인증 성공!', type: 'confirm' });
        setProfileData({ businessIsVerified: 'Y' }); // 인증 상태 업데이트
        setDesc('사업자 인증 완료');
      } else if (response.data?.data === 'N') {
        // alert('사업자 인증 실패');
        showToast({ message: '사업자 인증 실패', type: 'error' });

        setProfileData({ businessIsVerified: 'N' }); // 인증 상태 업데이트
        setDesc('사업자 인증 실패');
      } else {
        // showToast({ message: '사업자 인증 성공!', type: 'confirm' });
        console.log(response.data?.message || '사업자 인증 실패');
      }
    } catch (error) {
      showToast({ message: '사업자 인증중 에러 발생', type: 'error' });

      console.log('사업자 인증 중 에러가 발생했습니다.', error);
    }
  };

  return (
    <div className='flex flex-col gap-y-[2.4rem]'>
      <div className='flex flex-col gap-y-[0.8rem]'>
        <div className='text-body3 font-semibold text-gray-800'>사업자 인증</div>
        <div className='flex w-full gap-[0.8rem]'>
          <div className='flex-grow'>
            <Input
              placeholder='대표자 성명'
              name='representativeName'
              value={businessData.representativeName}
              onChange={(e) => handleChange('representativeName', e.target.value)}
            />
          </div>
          <button
            className='border-none bg-gray-100 text-body3 text-gray-700 rounded-md p-[1rem]'
            disabled={isLoading} // 로딩 중 버튼 비활성화
            onClick={handleVerify}
          >
            {isLoading ? '인증 중...' : '인증하기'}
          </button>
        </div>
        <Input
          placeholder='사업자 등록번호 ( - 없이 입력)'
          name='businessNumber'
          value={businessNumber}
          onChange={(e) => handleChange('businessNumber', e.target.value)}
        />
        <Input
          placeholder='개업 일자 (YYYYMMDD)'
          name='startDate'
          value={businessData.startDate}
          onChange={(e) => handleChange('startDate', e.target.value)}
        />
        {desc && <p className='text-primary text-iconCaption p-2'>{desc}</p>}
        {isError && <p className='text-primary'>사업자 인증 중 문제가 발생했습니다.</p>}
      </div>

      <div className='flex flex-col gap-y-[0.8rem]'>
        <div className='text-body3 font-semibold text-gray-800'>서류 등록 (사업자 등록증 및 애견 미용 자격증)</div>
        <div className='text-gray-700 text-iconCaption'>5MB 이하의 jpg, png 파일 3개까지 업로드 가능합니다.</div>
        <div className='flex flex-wrap gap-[0.8rem]'>
          {fileData.certifications.map((cert, index) => (
            <div key={index} className='relative h-[20rem] w-[12rem] rounded-md overflow-hidden'>
              <img
                src={URL.createObjectURL(cert)}
                alt={`certification-${index}`}
                className='h-full w-full object-cover'
              />
              <div className='absolute top-0 left-0 w-full bg-gradient-to-b from-gray-500 to-transparent py-6'>
                <button
                  type='button'
                  onClick={() => {
                    const updatedCerts = fileData.certifications.filter((_, i) => i !== index);
                    setFileData({ certifications: updatedCerts });
                  }}
                  className='absolute top-2 right-2 flex items-center justify-center'
                >
                  <CloseIcon className='w-[1.2rem] h-[1.2rem] stroke-gray-50' />
                </button>
              </div>
            </div>
          ))}
          {fileData.certifications.length < 3 && (
            <label
              htmlFor='upload-image'
              className='flex h-[20rem] w-[12rem] items-center justify-center rounded-md bg-gray-50 hover:cursor-pointer'
            >
              <CameraIcon className='w-[3rem] h-[3rem]' isCircle={false} color='#C2C7CD' />
              <input
                id='upload-image'
                type='file'
                accept='image/jpeg, image/png'
                className='hidden'
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFileData({ certifications: [...fileData.certifications, file] });
                  }
                }}
              />
            </label>
          )}
        </div>
      </div>
    </div>
  );
};
export default Step3;
