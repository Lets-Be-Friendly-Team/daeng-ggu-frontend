import { CategoryTab, Header, PageContainer } from '@daeng-ggu/design-system';

import CompletedServices from './components/CompletedServices';
import ReservationHistory from './components/ReservationHistory';

const data = [
  {
    reservationId: 1, // 에약 id
    petName: '장군이', // 반려견 이름
    reservationType: '', // 예약 종류
    isFinished: false, // 예약 프로세스 완료 여부
    isCanceled: false, // 예약 결제 취소 완료
    reservationDate: '2025.01.01', // 예약 일자
    startTime: '', // 예약 시작 시간
    groomingFee: 50000, // 미용비
    deliveryFee: 30000, // 댕동비
    monitoringFee: 20000, // 모니터링비
    totalPayment: 100000, // 총결제비
    estimateDetail: '', // 견적서 상세 내용
    requestDetail: {
      desiredService: '', // 원하는 서비스
      lastGroomingDate: '', // 마지막 미용 시기
      isDelivery: true, // 반려견 픽업 여부
      isMonitoring: true, // 모니터링 서비스 여부
      additionalRequest: '따로 논의하겠습니다.', // 추가 요청 사항
    },
  },
  {
    reservationId: 2,
    petName: '장군이',
    reservationType: '',
    isFinished: true,
    isCanceled: false,
    reservationDate: '2024.01.01',
    startTime: '',
    groomingFee: 50000,
    deliveryFee: 30000,
    monitoringFee: 20000,
    totalPayment: 100000,
    estimateDetail: '',
    requestDetail: {
      desiredService: '',
      lastGroomingDate: '',
      isDelivery: true,
      isMonitoring: true,
      additionalRequest: '따로 논의하겠습니다.',
    },
  },
  {
    reservationId: 3,
    petName: '장군이',
    reservationType: '',
    isFinished: false,
    isCanceled: false,
    reservationDate: '2024.01.01',
    startTime: '',
    groomingFee: 50000,
    deliveryFee: 30000,
    monitoringFee: 20000,
    totalPayment: 100000,
    estimateDetail: '',
    requestDetail: {
      desiredService: '',
      lastGroomingDate: '',
      isDelivery: true,
      isMonitoring: true,
      additionalRequest: '따로 논의하겠습니다.',
    },
  },
];
const ReservationPage = () => {
  const unfiinishedReservations = data.filter((item) => !item.isFinished);
  const completedReservations = data.filter((item) => item.isFinished);

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
