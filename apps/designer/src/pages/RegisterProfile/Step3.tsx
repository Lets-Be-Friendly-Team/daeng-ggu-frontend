import { CloseIcon, Input } from '@daeng-ggu/design-system';
import CameraIcon from '@daeng-ggu/design-system/components/Icons/CameraIcon';

import useProfileStore from '@/stores/useProfileStore';

const Step3 = () => {
  const { profileData, setProfileData } = useProfileStore();

  return (
    <div className='flex flex-col gap-y-[2.4rem]'>
      <div className='flex flex-col gap-y-[0.8rem]'>
        <div className='text-body3 font-semibold text-gray-800'>사업자 인증</div>
        <div className='flex w-full gap-[0.8rem]'>
          <div className='flex-grow'>
            <Input placeholder='대표자 성명' />
          </div>
          <button className='border-none bg-gray-100 text-body3 text-gray-700 rounded-md p-[1rem]'>인증하기</button>
        </div>
        <Input placeholder='사업자 등록번호' />
        <Input placeholder='개업 일자' />
      </div>
      {/* <ul className='mt-4 flex w-full flex-wrap gap-x-[4%] gap-y-6'>
          이미지 미리보기
          {imgList.map((file, index) => (
            <div key={index} className='relative aspect-square w-[22%]'>
              <li className='flex h-full w-full items-center justify-center overflow-hidden rounded-md'>
                <img className='h-full w-full object-cover' alt='이미지' src={URL.createObjectURL(file)} />
              </li>
              <button onClick={() => handleImgDelete(index, false)} className='absolute -right-2 -top-2'>
                <CloseCircleIcon className='h-8 w-8' />
              </button>
            </div>
          ))}

          파일 업로더
          <button className='aspect-square w-[22%] rounded-md border-none bg-gray-50 focus:outline-none'>
            <FileUploader
              handleChange={handleFileChange} // 파일 업로드 처리 함수로 변경
              name='file'
              types={fileTypes}
              multiple={true}
              hoverTitle='놓으세요!'
              classes='flex items-center justify-center w-full h-full'
              uploadedLabel=' '
              label=' '
            >
              <PlusIcon className='w-8' />
            </FileUploader>
          </button>
        </ul> */}

      <div className='flex flex-col gap-y-[0.8rem]'>
        <div className='text-body3 font-semibold text-gray-800'>서류 등록 (사업자 등록증 및 애견 미용 자격증)</div>
        <div className='text-gray-700 text-iconCaption'>5MB 이하의 jpg, png 파일 3개까지 업로드 가능합니다.</div>
        <div className='flex flex-wrap gap-[0.8rem]'>
          {profileData.certifications.map((cert, index) => (
            <div key={index} className='relative h-[20rem] w-[12rem] rounded-md overflow-hidden'>
              <img src={cert} alt={`certification-${index}`} className='h-full w-full object-cover' />
              <div className='absolute top-0 left-0 w-full bg-gradient-to-b from-gray-500 to-transparent py-6'>
                <button
                  type='button'
                  onClick={() => {
                    const updatedCerts = profileData.certifications.filter((_, i) => i !== index);
                    setProfileData({ certifications: updatedCerts });
                  }}
                  className='absolute top-2 right-2 flex items-center justify-center'
                >
                  <CloseIcon className='w-[1.2rem] h-[1.2rem] stroke-gray-50' />
                </button>
              </div>
            </div>
          ))}
          {profileData.certifications.length < 3 && (
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
                    const reader = new FileReader();
                    reader.onload = () => {
                      if (reader.result) {
                        setProfileData({
                          certifications: [...profileData.certifications, reader.result as string],
                        });
                      }
                    };
                    reader.readAsDataURL(file);
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
