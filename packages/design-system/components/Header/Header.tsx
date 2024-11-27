import BellIcon from '../Icons/BellIcon';
import textLogoImage from '../../assets/images/textLogo.png';
import BackIcon from '../Icons/BackIcon';
import CloseIcon from '../Icons/CloseIcon';

interface IHeaderProps {
  mode: 'main' | 'back' | 'close';
  title?: string;
  onClick?: () => void;
}
const Header = ({ mode, title, onClick }: IHeaderProps) => {
  return (
    <div className='flex h-[50px] items-center justify-center bg-white'>
      {mode === 'main' && (
        <div className='flex h-auto w-full items-center justify-between px-5 py-4'>
          <img src={textLogoImage} alt='logo image' className='h-[22px] w-[41px]' onClick={onClick} />
          <BellIcon className='h-5 w-5' />
        </div>
      )}
      {mode === 'back' && (
        <div className='flex h-auto w-full items-center px-5 py-4'>
          <button onClick={onClick}>
            <BackIcon className='mr-auto h-5 w-5' />
          </button>
          <div className='flex-1 text-center text-sub_h2'>{title}</div>
        </div>
      )}
      {mode === 'close' && (
        <div className='flex h-auto w-full items-center px-5 py-4'>
          <CloseIcon className='mr-auto h-5 w-5' />
          <div className='flex-1 text-center text-sub_h2'>{title}</div>
        </div>
      )}
    </div>
  );
};
export default Header;
