import { ToastType } from '../../types/toast';
import ConfirmIcon from '../Icons/toast/ConfirmIcon';
import ErrorIcon from '../Icons/toast/ErrorIcon';
import WarningIcon from '../Icons/toast/WarningIcon';

const renderIcon = (type: ToastType) => {
  if (type === 'error') return <ErrorIcon />;
  if (type === 'confirm') return <ConfirmIcon />;
  if (type === 'warning') return <WarningIcon />;
  return null;
};

const Toast = ({ type, message }: { type: ToastType; message: string | null }) => {
  return (
    <div
      id='toast-simple'
      className='fixed left-1/2 top-[2rem] z-[9999] flex w-full max-w-xs -translate-x-1/2 animate-slide-up items-center space-x-4 divide-x divide-gray-200 rounded-lg bg-white p-4 text-gray-500 shadow dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-400 rtl:space-x-reverse rtl:divide-x-reverse'
      role='alert'
    >
      {renderIcon(type)}
      <div className='ps-4 font-pretendard text-sub_h3 font-semibold text-gray-800'>{message}</div>
    </div>
  );
};

export default Toast;
