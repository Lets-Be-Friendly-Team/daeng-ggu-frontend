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
/**
 * designer card 라는 모드 하나 추가함
 * 기존에 쓴 곳에는 영향이 없을 예정
 * designer 카드 쓰는 예시
 * <Avatar
 *   mode='designerCard'
 *   imageUrl={estimate.designerImageUrl}
 *   name={estimate.designerName}
 *   containerClassName='mr-4 h-[70px] w-[70px]'
 *  />
 * */
function Avatar({ imageUrl, name, mode, isActive, onClick, containerClassName, imageClassName }: IAvatarProps) {
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
    <button className='w-[45px] flex-col' onClick={onClick}>
      {mode === 'avatar' && (
        <>
          <div
            className={`flex h-[45px] w-[45px] items-center justify-center overflow-hidden rounded-full ${
              isActive ? 'border border-primary' : ''
            }`}
          >
            <img src={imageUrl} className='h-[45px] w-[45px] object-cover' alt='Avatar' />
          </div>
          <div className={`flex justify-center pt-[7px] text-caption ${isActive ? 'text-primary' : 'text-gray-500'}`}>
            {name}
          </div>
        </>
      )}
      {mode === 'add' && (
        <>
          <div
            className={`flex h-[45px] w-[45px] items-center justify-center overflow-hidden rounded-full border border-gray-200 ${
              isActive ? 'border border-primary' : ''
            }`}
          >
            <PlusIcon className='h-[24px] w-[24px]' />
          </div>
          <div className={`flex justify-center pt-[7px] text-caption text-primary`}>추가하기</div>
        </>
      )}
      {mode === 'request' && (
        <>
          <div
            className={`flex h-[45px] w-[45px] items-center justify-center overflow-hidden rounded-full border border-gray-200 ${
              isActive ? 'border border-primary' : ''
            }`}
          >
            <PlusIcon className='h-[24px] w-[24px]' />
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
}

export default Avatar;
