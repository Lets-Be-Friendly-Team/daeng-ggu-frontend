import { useNavigate } from 'react-router-dom';
import { ExclamationIcon } from '@daeng-ggu/design-system';

import EmptyNotification from '../../components/Notification/EmptyNotification';
import useGetAlarms from '../../hooks/queries/useGetAlarms';

const FullNotification = () => {
  const navigate = useNavigate();
  const { data: response } = useGetAlarms();

  console.log('response', response);
  // const sortedData = [...response?.data].sort((a, b) => a.alarmStatus - b.alarmStatus);
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
    <div className='h-fit pb-[10rem]'>
      {response?.data && response?.data.length === 0 ? (
        <EmptyNotification text='알림이 없어요!' />
      ) : (
        response?.data.map((notification) => {
          const isRead = notification.alarmStatus === true;
          const containerClass = isRead
            ? 'flex flex-col p-[16px] border-b text-gray-100 border-gray-100 hover:bg-secondary cursor-pointer'
            : 'flex flex-col p-[16px] border-b border-gray-100 hover:bg-secondary cursor-pointer';
          const iconColor = isRead ? 'lightgray' : 'gray';

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

export default FullNotification;
