import { useNavigate } from 'react-router-dom';
import { ExclamationIcon } from '@daeng-ggu/design-system';

type NotificationItem = {
  alarmId: number;
  objectId: number;
  alarmMessage: string;
  alarmType: string;
  alarmStatus: number;
  alarmTypeName: string;
};

type FullNotificationProps = {
  data: NotificationItem[];
};

const FullNotification = ({ data }: FullNotificationProps) => {
  const navigate = useNavigate();
  const sortedData = [...data].sort((a, b) => a.alarmStatus - b.alarmStatus);

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
    <div>
      {sortedData.length === 0 ? (
        <div>알림이 없어요!</div>
      ) : (
        sortedData.map((notification) => {
          const isRead = notification.alarmStatus === 1;
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
                <p className='px-1 text-caption font-semibold'>{notification.alarmTypeName}</p>
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
