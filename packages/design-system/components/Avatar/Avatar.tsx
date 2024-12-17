import logo from '../../assets/images/logoImage.webp';
import PlusIcon from '../Icons/PlusIcon';

interface IAvatarProps {
  mode: 'avatar' | 'add' | 'request' | 'requestView' | 'designerCard';
  imageUrl?: string;
  name?: string;
  isActive?: boolean;
  onClick?: () => void;
  containerClassName?: string;
  imageClassName?: string;
}

const Avatar = ({ imageUrl, name, mode, isActive, onClick, containerClassName, imageClassName }: IAvatarProps) => {
  if (mode === 'designerCard') {
    return (
      <div
        className={`flex items-center justify-center overflow-hidden rounded-[8px] ${
          isActive ? 'border border-primary' : ''
        } ${containerClassName}`}
      >
        <img
          src={imageUrl}
          alt={name || '디자이너 이미지'}
          className={`h-full w-full rounded-[8px] object-cover ${imageClassName}`}
        />
      </div>
    );
  }

  return (
    <button className='w-auto flex-col' onClick={onClick}>
      {mode === 'avatar' && (
        <>
          <div
            // className={`flex h-[45px] w-[45px] items-center justify-center overflow-hidden rounded-full ${
            className={`flex h-[6rem] w-[6rem] items-center justify-center overflow-hidden rounded-full bg-secondary${
              isActive ? 'border border-primary' : ''
            }`}
          >
            {/* <img src={imageUrl || logo} className='h-[45px] w-[45px] object-cover' alt='Avatar' /> */}
            <img src={imageUrl || logo} className='h-full w-full object-cover' alt='Avatar' />
          </div>
          <div className={`flex justify-center pt-[7px] text-caption ${isActive ? 'text-primary' : 'text-gray-500'}`}>
            {name}
          </div>
        </>
      )}
      {mode === 'add' && (
        <>
          <div
            // className={`flex h-[45px] w-[45px] items-center justify-center overflow-hidden rounded-full border border-gray-200 ${
            className={`flex h-[6rem] w-[6rem] items-center justify-center overflow-hidden rounded-full border border-gray-200 ${
              isActive ? 'border border-primary' : ''
            }`}
          >
            <PlusIcon className='h-[3rem] w-[3rem]' />
          </div>
          {/* <div className={`flex justify-center pt-[7px] text-caption text-primary`}> </div> */}
        </>
      )}
      {mode === 'request' && (
        <>
          <div
            // className={`flex h-[45px] w-[45px] items-center justify-center overflow-hidden rounded-full border border-gray-200 ${
            className={`flex h-[6rem] w-[6rem] items-center justify-center overflow-hidden rounded-full border border-gray-200 ${
              isActive ? 'border border-primary' : ''
            }`}
          >
            {/* <PlusIcon className='h-[24px] w-[24px]' /> */}
            <PlusIcon className='h-[3rem] w-[3rem]' />
          </div>
          <div className={`flex justify-center pt-[7px] text-caption text-gray-500`}>새 요청</div>
        </>
      )}
      {mode === 'requestView' && (
        <>
          <div
            className={`flex items-center justify-center overflow-hidden rounded-full ${
              isActive ? 'border border-primary' : ''
            }`}
            style={{ height: '50px', width: '50px' }}
          >
            <img src={imageUrl} className='h-[50px] w-[50px] object-cover' alt='Avatar' />
          </div>
          <div className={`flex justify-center pt-[7px] text-caption ${isActive ? 'text-primary' : 'text-gray-500'}`}>
            {name}
          </div>
        </>
      )}
    </button>
  );
};

export default Avatar;
