import { useEffect } from 'react';
import { CategoryTab, Header, PageContainer } from '@daeng-ggu/design-system';

import useReservation from '@/hooks/queries/Reservation/useGetReservation';
import useGetUserInfo from '@/hooks/queries/userInfo/useGetUserInfo';
import useDesignerIdStore from '@/stores/useDesignerIdStore';

import CompletedServices from './components/CompletedServices';
import ReservationHistory from './components/ReservationHistory';

const ReservationPage = () => {
  // const designerId = 4;
  const { data: reservationData, isError } = useReservation();
  const unfiinishedReservations = reservationData?.filter((item) => !item.isFinished);
  const completedReservations = reservationData?.filter((item) => item.isFinished);
  const { data: userData, error } = useGetUserInfo();
  const { setDesignerId } = useDesignerIdStore();

  // 디자이너 id값 저장
  useEffect(() => {
    if (userData?.status === 'SUCCESS') {
      const userInfo = userData.data;
      // console.log(data);
      setDesignerId(userInfo.id);
    } else {
      return;
    }
  }, [userData, setDesignerId]);

  if (isError) {
    return <div>예약 내역 정보를 가져오는 중 오류가 발생했습니다.</div>;
  }
  if (error) return <p>Error: {error.message}</p>;

  console.log(reservationData);

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
        <Header mode='main' />
        <CategoryTab tabs={tabs} />
      </PageContainer>
    </div>
  );
};

export default ReservationPage;
