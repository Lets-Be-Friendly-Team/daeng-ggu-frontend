import { ButtonHTMLAttributes, useEffect, useState } from 'react';
import { SSEEventSource } from '@daeng-ggu/shared';

import BellAlertIcon from '../Icons/BellAlertIcon';
import BellIcon from '../Icons/BellIcon';

interface BellIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
}

const BellIconButton = ({ onClick }: BellIconButtonProps) => {
  const [bellAlert, setBellAlert] = useState(false);
  useEffect(() => {
    const eventSource = SSEEventSource('/daengggu/alarm/subscribe');

    eventSource.addEventListener('alarm', (event) => {
      console.log('alarmEvent', event);
      setBellAlert(true);
    });

    eventSource.onerror = () => {
      //에러 발생시 할 동작
      eventSource.close(); //연결 끊기
    };
    return () => {
      eventSource.close();
    };
  }, []);
  return (
    <button onClick={onClick} type='button'>
      {bellAlert ? (
        <BellAlertIcon className='ml-auto h-[20px] w-[20px]' />
      ) : (
        <BellIcon className='ml-auto h-[20px] w-[20px]' />
      )}
    </button>
  );
};

export default BellIconButton;
