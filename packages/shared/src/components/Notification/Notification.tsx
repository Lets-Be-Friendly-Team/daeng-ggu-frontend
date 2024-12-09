import { CategoryTab, Header, PageContainer } from '@daeng-ggu/design-system';

import FullNotification from './FullNotification';
import UnreadNotification from './UnreadNotification';

const Notification = () => {
  const dummyData = {
    alarmList: [
      {
        alarmId: 1,
        objectId: 1,
        alarmMessage: '견적제안이 왔습니다',
        alarmType: 'A2',
        alarmStatus: 1,
      },
      {
        alarmId: 2,
        objectId: 1,
        alarmMessage: '견적요청을 실패하였습니다',
        alarmType: 'A1',
        alarmStatus: 0,
      },
      {
        alarmId: 3,
        objectId: 1,
        alarmMessage: '예약이 완료되었습니다.',
        alarmType: 'A3',
        alarmStatus: 1,
      },
      {
        alarmId: 4,
        objectId: 1,
        alarmMessage: '리뷰입뉘다',
        alarmType: 'A4',
        alarmStatus: 0,
      },
      {
        alarmId: 1,
        objectId: 1,
        alarmMessage: '견적제안이 왔습니다',
        alarmType: 'A2',
        alarmStatus: 0,
      },
    ],
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

  const getUnreadNotifications = (data: typeof dummyData) => {
    return data.alarmList
      .filter((item) => item.alarmStatus === 0)
      .map((item) => ({
        ...item,
        alarmTypeName: getAlarmTypeName(item.alarmType),
      }));
  };

  const getAllNotifications = (data: typeof dummyData) => {
    return data.alarmList.map((item) => ({
      ...item,
      alarmTypeName: getAlarmTypeName(item.alarmType),
    }));
  };

  const tabs = [
    {
      label: '읽지않은 알림',
      content: <UnreadNotification data={getUnreadNotifications(dummyData)} />,
    },
    {
      label: '알림 목록',
      content: <FullNotification data={getAllNotifications(dummyData)} />,
    },
  ];

  return (
    <div className='h-full w-full'>
      <div className='w-full'>
        <PageContainer>
          <Header mode='back' title='알림목록' />
        </PageContainer>
        <CategoryTab tabs={tabs} />
      </div>
    </div>
  );
};

export default Notification;
