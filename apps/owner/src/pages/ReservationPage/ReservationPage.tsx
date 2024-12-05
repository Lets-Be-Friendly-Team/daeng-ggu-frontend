import { CategoryTab, Header, PageContainer } from '@daeng-ggu/design-system';

import CompletedServices from './components/CompletedServices';
import ReservationHistory from './components/ReservationHistory';

const ReservationPage = () => {
  const tabs = [
    {
      label: '예약 내역',
      content: <ReservationHistory />,
    },
    {
      label: '미용 완료',
      content: <CompletedServices />,
    },
  ];
  return (
    <div>
      <PageContainer>
        <Header mode='back' title='예약 조회' />
        <CategoryTab tabs={tabs} />
      </PageContainer>
    </div>
  );
};

export default ReservationPage;
