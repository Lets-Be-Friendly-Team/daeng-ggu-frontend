import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExclamationIcon } from '@daeng-ggu/design-system';

import SSEEventSource from '../../apis/SSE/SSEEventSource';
import EmptyNotification from '../../components/Notification/EmptyNotification';

type NotificationItem = {
  alarmId: number;
  alarmMessage: string;
  alarmType: string;
  alarmStatus: number;
};

const getAlarmTypeName = (alarmType: string) => {
  switch (alarmType) {
    case 'A1':
      return '요청알림';
    case 'A2':
      return '견적알림';
    case 'A3':
      return '예약알림';
    case 'A4':
      return '리뷰알림';
    default:
      return '';
  }
};

const UnreadNotification = () => {
  const [unreadNotifications, setUnreadNotifications] = useState<NotificationItem[]>([]);
  useEffect(() => {
    const eventSource = SSEEventSource('/daengggu/alarm/subscribe');

    eventSource.addEventListener('alarm', (event) => {
      console.log('alarmEvent', JSON.parse(event.data));
      setUnreadNotifications((prev) => [...prev, JSON.parse(event.data)]);
    });

    eventSource.onerror = () => {
      //에러 발생시 할 동작
      eventSource.close(); //연결 끊기
    };
    return () => {
      eventSource.close();
    };
  }, []);

  const navigate = useNavigate();

  const getRouteByAlarmType = (alarmType: string) => {
    switch (alarmType) {
      case 'A1':
      case 'A2':
        return '/bid';
      case 'A3':
        return '/reservation';
      case 'A4':
        return '/review';
      default:
        return '/';
    }
  };

  return (
    <div className='pb-[10rem]'>
      {unreadNotifications.length === 0 ? (
        <EmptyNotification text='읽지 않은 알림이 없어요!' />
      ) : (
        unreadNotifications.map((notification) => {
          const containerClass = 'flex flex-col p-[16px] border-b border-gray-100 hover:bg-secondary cursor-pointer';
          const iconColor = 'gray';

          return (
            <div
              key={notification.alarmId}
              className={containerClass}
              onClick={() => navigate(getRouteByAlarmType(notification.alarmType))}
              role='button'
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') navigate(getRouteByAlarmType(notification.alarmType));
              }}
            >
              <div className='flex'>
                <ExclamationIcon className='w-[14px] h-[14px]' color={iconColor} />
                <p className='px-1 text-caption font-semibold'>{getAlarmTypeName(notification.alarmType)}</p>
              </div>
              <div className='pl-6 text-sub_h3 mt-[10px] font-semibold overflow-hidden text-ellipsis line-clamp-2'>
                <p>{notification.alarmMessage}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default UnreadNotification;
