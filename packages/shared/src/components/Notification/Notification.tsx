import { CategoryTab, Header, PageContainer } from '@daeng-ggu/design-system';

import FullNotification from './FullNotification';
import UnreadNotification from './UnreadNotification';

const Notification = () => {
  const tabs = [
    {
      label: '읽지않은 알림',
      content: <UnreadNotification />,
    },
    {
      label: '알림 목록',
      content: <FullNotification />,
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
