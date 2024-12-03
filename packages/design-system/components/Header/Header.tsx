import textLogoImage from '../../assets/images/textLogo.png';
import BackIcon from '../Icons/BackIcon';
import BellIcon from '../Icons/BellIcon';
import CloseIcon from '../Icons/CloseIcon';

interface IHeaderProps {
  mode: 'main' | 'back' | 'close';
  title?: string;
  onClick?: () => void;
}

/*
 * 'back' 및 'close'에 대한 온 클릭버튼 로직 추가
 *  근데 왜 변수명 IHeader?
 * **/
const Header = ({ mode, title, onClick }: IHeaderProps) => {
  return (
    <div className='sticky left-0 right-0 top-0 z-50 flex h-[50px] w-full bg-white'>
      <div className='mx-auto flex h-auto w-full max-w-[1200px] items-center px-5 py-4'>
        {mode === 'main' && (
          <>
            <img src={textLogoImage} alt='logo image' className='h-[22px] w-[41px]' onClick={onClick} />
            <BellIcon className='ml-auto h-5 w-5' />
          </>
        )}
        {mode === 'back' && (
          <>
            <button onClick={onClick}>
              <BackIcon className='mr-auto h-5 w-5' />
            </button>
            <div className='flex-1 text-center text-sub_h2'>{title}</div>
          </>
        )}
        {mode === 'close' && (
          <>
            <button onClick={onClick}>
              <CloseIcon className='mr-auto h-5 w-5' />
            </button>
            <div className='flex-1 text-center text-sub_h2'>{title}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
