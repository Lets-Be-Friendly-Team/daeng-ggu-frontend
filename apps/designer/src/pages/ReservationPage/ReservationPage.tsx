import { CategoryTab, Header, PageContainer } from '@daeng-ggu/design-system';

import useReservation from '@/hooks/queries/Reservation/useGetReservation';

import CompletedServices from './components/CompletedServices';
import ReservationHistory from './components/ReservationHistory';

const ReservationPage = () => {
  // const designerId = 4;
  const { data: reservationData, isError } = useReservation();
  const unfiinishedReservations = reservationData?.filter((item) => !item.isFinished);
  const completedReservations = reservationData?.filter((item) => item.isFinished);
  console.log(reservationData);
  if (isError) {
    return <div>예약 내역 정보를 가져오는 중 오류가 발생했습니다.</div>;
  }
  const tabs = [
    {
      label: '예약 내역',
      content: <ReservationHistory reservationList={unfiinishedReservations} />,
    },
    {
      label: '미용 완료',
      content: <CompletedServices completedGroomingList={completedReservations} />,
    },
  ];

  return (
    <div className='pb-[65px]'>
      <PageContainer>
        <Header mode='back' title='예약 조회' />
        <CategoryTab tabs={tabs} />
      </PageContainer>
    </div>
  );
};

export default ReservationPage;
