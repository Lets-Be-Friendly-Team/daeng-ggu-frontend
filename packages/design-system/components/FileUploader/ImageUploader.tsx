import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

import logoImage from '../../assets/images/logoImage.webp';
import CloseCircleIcon from '../Icons/CloseCircleIcon';
import PlusIcon from '../Icons/PlusIcon';

import ImageSlider from './ImageSlider';

interface ImageUploaderProps {
  mode: 'img' | 'both'; //이미지만 업로드하는 mode 와 동영상도 업로드 가능한 mode(포트폴리오 등록시 사용)
  initialImgList?: string[];
  initialVideo?: string;
  imgList?: File[];
  setImgList?: Dispatch<SetStateAction<File[]>>;
  video?: File | null;
  setVideo?: Dispatch<SetStateAction<File | null>>;
  label?: string;
  subLabel?: string;
}

const ImageUploader = ({
  mode,
  initialImgList = [],
  initialVideo = '',
  imgList = [],
  setImgList,
  video = null,
  setVideo,
  label = '',
  subLabel = '',
}: ImageUploaderProps) => {
  const fileTypes =
    mode === 'img' ? ['jpg', 'png', 'jpeg', 'gif'] : ['jpg', 'png', 'jpeg', 'gif', 'avi', 'mp4', 'mov', 'wmv'];

  const [currentImgList, setCurrentImgList] = useState<string[]>(initialImgList);
  const [currentVideo, setCurrentVideo] = useState<string>(initialVideo);

  useEffect(() => {
    setCurrentImgList(initialImgList);
  }, [initialImgList]);
  // 이미지 업로드 핸들러
  const handleImgUpload = (files: File[]) => {
    setImgList?.((prev) => [...prev, ...files]);
  };

  // 비디오 업로드 핸들러
  const handleVideoUpload = (files: File[]) => {
    if (files.length > 1 || currentVideo || video) {
      alert('비디오는 최대 1개만 업로드할 수 있습니다.');
      return;
    }

    const videoFile = files[0];
    setVideo?.(videoFile);
    // setCurrentVideo(URL.createObjectURL(videoFile));
  };

  // 이미지 삭제 핸들러
  const handleImgDelete = (index: number, isInitial: boolean) => {
    if (isInitial) {
      setCurrentImgList((prev) => prev.filter((_, i) => i !== index));
    } else {
      setImgList?.((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // 비디오 삭제 핸들러
  const handleVideoDelete = (isInitial: boolean) => {
    if (isInitial) {
      setCurrentVideo('');
    } else {
      setVideo?.(null);
    }
  };

  // 슬라이더에 전달할 데이터 생성
  const sliderList = [
    ...currentImgList.map((src) => ({ type: 'image', src })),
    ...imgList.map((file) => ({ type: 'image', src: URL.createObjectURL(file) })),
    ...(currentVideo ? [{ type: 'video', src: currentVideo }] : []),
    ...(video ? [{ type: 'video', src: URL.createObjectURL(video) }] : []),
  ];

  // 파일 업로드 후 처리
  const handleFileChange = (files: File[]) => {
    console.log(files); // 파일이 잘 들어오는지 확인
    const imageFiles = Array.from(files).filter((file) => file.type.startsWith('image/'));
    const videoFiles = Array.from(files).filter((file) => file.type.startsWith('video/'));

    console.log('Image Files:', imageFiles);
    console.log(imgList);
    console.log('Video Files:', videoFiles);
    // 이미지 처리
    if (imageFiles.length > 0) {
      handleImgUpload(imageFiles);
    }

    // 비디오 처리
    if (videoFiles.length > 0) {
      handleVideoUpload(videoFiles);
    }
  };

  return (
    <div>
      <div className='mb-[0.8rem] text-body3 font-semibold text-gray-800'>
        <p>{label}</p>
        <p className='mt-[0.6rem] text-iconCaption text-gray-700'>{subLabel}</p>
      </div>
      {/* 슬라이더 */}
      {sliderList.length > 0 ? (
        <ImageSlider list={sliderList} />
      ) : (
        <div className='flex aspect-[3/2] w-full flex-col items-center justify-center gap-y-6 rounded-md bg-secondary'>
          <img src={logoImage} className='w-[15rem]' alt='기본 이미지' />
          <p className='text-body3 text-primary'>파일을 등록해주세요</p>
        </div>
      )}
      <ul className='mt-4 flex w-full flex-wrap gap-x-[4%] gap-y-6'>
        {/* 이미지 미리보기 */}
        {currentImgList.map((url, index) => (
          <div key={`initial-${index}`} className='relative flex aspect-square w-[22%]'>
            <li className='flex h-full w-full items-center justify-center overflow-hidden rounded-md'>
              <img className='h-full w-full object-cover' alt='이미지' src={url} />
            </li>
            <button onClick={() => handleImgDelete(index, true)} className='absolute -right-2 -top-2'>
              <CloseCircleIcon className='h-8 w-8' />
            </button>
          </div>
        ))}
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
        {/* 비디오 미리보기 */}
        {currentVideo && (
          <div className='relative flex aspect-square w-[22%]'>
            <li className='flex h-full w-full items-center justify-center overflow-hidden rounded-md'>
              <video className='h-full w-full object-cover' controls src={currentVideo}></video>
            </li>
            <button onClick={() => handleVideoDelete(true)} className='absolute -right-2 -top-2'>
              <CloseCircleIcon className='h-8 w-8' />
            </button>
          </div>
        )}
        {video && (
          <div className='relative flex aspect-square w-[22%]'>
            <li className='flex h-full w-full items-center justify-center overflow-hidden rounded-md'>
              <video className='h-full w-full object-cover' controls src={URL.createObjectURL(video)}></video>
            </li>
            <button onClick={() => handleVideoDelete(false)} className='absolute -right-2 -top-2'>
              <CloseCircleIcon className='h-8 w-8' />
            </button>
          </div>
        )}
        {/* 파일 업로더 */}
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
      </ul>
    </div>
  );
};

export default ImageUploader;
