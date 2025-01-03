import { useNavigate } from 'react-router-dom';

import textLogoImage from '../../assets/images/textLogo.png';
import BackIcon from '../Icons/BackIcon';
import CloseIcon from '../Icons/CloseIcon';

import BellIconButton from './BellIconButton';

interface IHeaderProps {
  mode: 'main' | 'back' | 'close' | 'customBack';
  alarm?: boolean;
  title?: string;
  onClick?: () => void;
}

const Header = ({ mode, title, onClick, alarm = true }: IHeaderProps) => {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate('/');
  };
  const handleNotificationClick = () => {
    navigate('/notification');
  };
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className='sticky left-0 right-0 top-0 z-50 flex h-[50px] w-full bg-white'>
      <div className='relative mx-auto flex h-auto w-full max-w-[1200px] items-center py-4'>
        {mode === 'main' && (
          <div className='flex w-full items-center justify-between'>
            <button type='button'>
              <img src={textLogoImage} alt='logo image' className='h-[22px] w-[41px]' onClick={handleLogoClick} />
            </button>
            {alarm && <BellIconButton onClick={handleNotificationClick} />}
          </div>
        )}
        {(mode === 'back' || mode === 'close' || mode === 'customBack') && (
          <>
            <button
              type='button'
              onClick={onClick || handleBackClick}
              className='absolute left-0 flex h-[50px] items-center'
            >
              {mode === 'close' ? (
                <CloseIcon className='h-[2.2rem] w-[2.2rem]' />
              ) : (
                <BackIcon className='h-[2rem] w-[2rem]' />
              )}
            </button>
            <div className='flex-1 text-center text-sub_h1 font-semibold text-gray-800'>{title}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
