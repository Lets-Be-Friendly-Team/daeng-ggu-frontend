// 프로필 사진 업로드용 컴포넌트
import { Dispatch, SetStateAction } from 'react';
import { FileUploader } from 'react-drag-drop-files';

import logo from '../../assets/images/logoImage.webp';
import CameraIcon from '../Icons/CameraIcon';

interface ProfileImgUploaderProps {
  image?: File | undefined;
  setImage?: Dispatch<SetStateAction<File | undefined>>;
  initialImageUrl?: string; // 서버에서 가져온 초기 이미지 URL
}

// 허용 파일 타입 설정
const fileTypes = ['jpg', 'png', 'jpeg'];

const ProfileImgUploader = ({ image, setImage, initialImageUrl }: ProfileImgUploaderProps) => {
  // image 추가 핸들러
  const imgRegistHandler = (file: File) => {
    setImage?.(file);
  };

  // image 삭제 핸들러
  //   const imgDeleteHandler = () => {
  //     setImage?.(undefined);
  //   };

  const displayImage = image ? URL.createObjectURL(image) : initialImageUrl;

  return (
    <div className='relative flex aspect-square w-[12rem]'>
      {displayImage ? (
        //   <div className='bg-white'>
        <div className='flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-gray-100 bg-white'>
          <img alt='프로필 이미지' src={displayImage} className='h-full w-full object-cover' />
        </div>
      ) : (
        <div className='flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-secondary'>
          <img alt='기본 이미지' src={logo} className='w-[8rem]' />
        </div>
      )}

      <button className='absolute -bottom-1 -right-1 border-none focus:outline-none'>
        <FileUploader
          handleChange={imgRegistHandler}
          name='file'
          types={fileTypes}
          hoverTitle=' '
          classes='flex items-center justify-center w-full h-full'
          uploadedLabel=' '
          label=' '
        >
          <CameraIcon className='h-[3rem] w-[3rem]' />
        </FileUploader>
      </button>
    </div>
  );
};
export default ProfileImgUploader;
