import { useNavigate } from 'react-router-dom';

import textLogoImage from '../../assets/images/textLogo.png';
import BackIcon from '../Icons/BackIcon';
import BellIcon from '../Icons/BellIcon';
import CloseIcon from '../Icons/CloseIcon';

interface IHeaderProps {
  mode: 'main' | 'back' | 'close';
  title?: string;
}

const Header = ({ mode, title }: IHeaderProps) => {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate('/');
  };
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <div className='sticky left-0 right-0 top-0 z-50 flex h-[50px] w-full bg-white'>
      <div className='mx-auto flex h-auto w-full max-w-[1200px] items-center px-5 py-4'>
        {mode === 'main' && (
          <div className='flex w-full items-center justify-between'>
            <button>
              <img src={textLogoImage} alt='logo image' className='h-[22px] w-[41px]' onClick={handleLogoClick} />
            </button>
            <button className=''>
              <BellIcon className='ml-auto h-[20px] w-[20px]' />
            </button>
          </div>
        )}
        {mode === 'back' && (
          <>
            <button onClick={handleBackClick}>
              <BackIcon className='mr-auto h-[20px] w-[20px]' />
            </button>
            <div className='flex-1 text-center text-sub_h2'>{title}</div>
          </>
        )}
        {mode === 'close' && (
          <>
            <button onClick={handleBackClick}>
              <CloseIcon className='mr-auto h-[20px] w-[20px]' />
            </button>
            <div className='flex-1 text-center text-sub_h2'>{title}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
