import { Header, PageContainer } from '@daeng-ggu/design-system';

import ReservationCard from '@/components/ReservationCard/ReservationCard';
import useGetReservationList from '@/hooks/queries/useGetReservationList';

const MainPage = () => {
  const { data: response } = useGetReservationList();
  const reservationList = response?.data || [];

  return (
    <PageContainer>
      <Header mode='main' alarm={false} />
      <section className='flex flex-col gap-[4rem]'>
        {reservationList?.map((reservation) => (
          <ReservationCard reservation={reservation} key={reservation.reservationId} />
        ))}
      </section>
    </PageContainer>
  );
};

export default MainPage;
