// 이미지 업로드 컴포넌트
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import SimpleImageSlider from 'react-simple-image-slider';

import CloseCircleIcon from '../Icons/CloseCircleIcon';
import PlusIcon from '../Icons/PlusIcon';

// 허용 파일 타입 설정
const fileTypes = ['jpg', 'png', 'jpeg', 'gif'];

const ImageUploader = () => {
  // image list 관리
  const [imgList, setImgList] = useState<File[]>([]);

  const [isDrag, setIsDrag] = useState(false);

  // image 추가 핸들러
  const imgRegistHandler = (files: File[]) => {
    setImgList((prev) => [...prev, ...files]);
  };

  const imgDeleteHandler = (deleteIndex: number) => {
    setImgList((prev) => prev.filter((_, index) => index !== deleteIndex));
  };

  return (
    <div className='w-full'>
      <div className='relative w-full overflow-clip rounded-md'>
        <SimpleImageSlider
          style={{ backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
          width={'40rem'}
          height={'40rem'}
          images={imgList.map((item) => {
            return { url: URL.createObjectURL(item) };
          })}
          showBullets={true}
          showNavs={true}
          bgColor='#E1DFE9'
          navSize={30}
        />
      </div>
      <ul className='flex h-[5rem] w-full flex-wrap gap-x-2 gap-y-2'>
        {imgList.map((image, index) => {
          return (
            <li key={index} className='relative flex items-start overflow-clip rounded-md'>
              <img className='h-[5rem] w-[5rem] object-cover' alt='이미지' src={URL.createObjectURL(image)} />

              <button onClick={() => imgDeleteHandler(index)} className='absolute right-0'>
                <CloseCircleIcon className='w-4' />
              </button>
            </li>
          );
        })}
        <FileUploader
          handleChange={imgRegistHandler}
          name='file'
          types={fileTypes}
          multiple
          // hoverTitle='놓으세요!'
          onDraggingStateChange={(dragging: boolean) => setIsDrag(dragging)}
        >
          <button className='flex h-[5rem] w-[5rem] items-center justify-center rounded-md border-none bg-gray-50 focus:outline-none'>
            {!isDrag && <PlusIcon className='w-8' />}
          </button>
        </FileUploader>
      </ul>
    </div>
  );
};

export default ImageUploader;
