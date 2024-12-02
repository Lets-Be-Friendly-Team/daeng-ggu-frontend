// 이미지 업로드 컴포넌트
import { Dispatch, SetStateAction } from 'react';
import { FileUploader } from 'react-drag-drop-files';

import logoImage from '../../assets/images/logoImage.png';
import CloseCircleIcon from '../Icons/CloseCircleIcon';
import PlusIcon from '../Icons/PlusIcon';

import ImageSlider from './ImageSlider';

interface ImageUploaderProps {
  imgList?: File[];
  setImgList?: Dispatch<SetStateAction<File[]>>;
  label?: string;
}
// 허용 파일 타입 설정
const fileTypes = ['jpg', 'png', 'jpeg', 'gif'];

const ImageUploader = ({ imgList = [], setImgList, label = '' }: ImageUploaderProps) => {
  // image list 관리
  // const [imgList, setImgList] = useState<File[]>([]);

  // image 추가 핸들러
  const imgRegistHandler = (files: File[]) => {
    setImgList?.((_prev: File[]) => [..._prev, ...files]);
  };

  // image 삭제 핸들러
  const imgDeleteHandler = (deleteIndex: number) => {
    setImgList?.((prev) => prev.filter((_, index) => index !== deleteIndex));
  };

  return (
    <div>
      <label>{label}</label>
      {/* 슬라이더 */}
      {imgList.length > 0 ? (
        <ImageSlider list={imgList} />
      ) : (
        <div className='flex aspect-[3/2] w-full flex-col items-center justify-center gap-y-6 rounded-md bg-secondary'>
          <img src={logoImage} className='w-[15rem]' alt='기본 이미지' />
          <p className='text-body3 text-primary'>파일을 등록해주세요</p>
        </div>
      )}
      <ul className='mt-4 flex w-full flex-wrap gap-x-[4%] gap-y-6'>
        {/* 미리보기 */}
        {imgList.map((image, index) => {
          return (
            <div key={index} className='relative flex aspect-square w-[22%]'>
              <li className='overflow-hidden rounded-md'>
                <img className='h-full w-full object-cover' alt='이미지' src={URL.createObjectURL(image)} />
              </li>
              <button onClick={() => imgDeleteHandler(index)} className='absolute -right-2 -top-2'>
                <CloseCircleIcon className='h-8 w-8' />
              </button>
            </div>
          );
        })}
        {/* 파일 업로더 */}
        <button className='aspect-square w-[22%] rounded-md border-none bg-gray-50 focus:outline-none'>
          <FileUploader
            handleChange={imgRegistHandler}
            name='file'
            types={fileTypes}
            multiple
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
