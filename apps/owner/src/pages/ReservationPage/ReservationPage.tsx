import { CategoryTab, Header, PageContainer } from '@daeng-ggu/design-system';

import CompletedServices from './components/CompletedServices';
import ReservationHistory from './components/ReservationHistory';

const data = [
  {
    reservationId: 1,
    petName: '장군이',
    majorBreedCode: 'P1',
    majorBreed: '소형견',
    subBreedCode: 'SB1',
    subBreed: '푸들',
    reservationType: 'R1', // 직접예약
    isFinished: false,
    isCanceled: false,
    reservationDate: '2025-01-01',
    dayOfWeek: '월요일',
    amPm: '오전',
    startTime: 10, // 오전 10시
    groomingFee: 50000,
    deliveryFee: 30000,
    monitoringFee: 20000,
    totalPayment: 100000,
    estimateDetail: '견적서 상세 내용입니다.',
    requestDetail: {
      desiredService: '미용 및 목욕',
      lastGroomingDate: '2024-12-01',
      isDelivery: true,
      desiredRegion: '서울특별시 강남구',
      isMonitoring: true,
      additionalRequest: '따로 논의하겠습니다.',
    },
  },
  {
    reservationId: 2,
    petName: '짱구',
    nickname: '박짱구',
    customerImgUrl: 'https://example.com/customer2.jpg',
    majorBreedCode: 'P2',
    majorBreed: '중형견',
    subBreedCode: 'SB2',
    subBreed: '시바견',
    reservationType: 'R2', // 입찰예약
    isFinished: true,
    isCanceled: false,
    reservationDate: '2024-12-31',
    dayOfWeek: '일요일',
    amPm: '오후',
    startTime: 2, // 오후 2시
    groomingFee: 60000,
    deliveryFee: 25000,
    monitoringFee: 15000,
    totalPayment: 100000,
    estimateDetail: '견적서 상세 내용입니다.',
    requestDetail: {
      desiredService: '전체 미용',
      lastGroomingDate: '2024-11-15',
      isDelivery: false,
      desiredRegion: '경기도 성남시 분당구',
      isMonitoring: false,
      additionalRequest: '추가 요청사항은 없습니다.',
    },
  },
  {
    reservationId: 3,
    petName: '바둑이',
    nickname: '이바둑',
    customerImgUrl: 'https://example.com/customer3.jpg',
    majorBreedCode: 'P3',
    majorBreed: '대형견',
    subBreedCode: 'SB3',
    subBreed: '리트리버',
    reservationType: 'R1', // 직접예약
    isFinished: false,
    isCanceled: true,
    reservationDate: '2024-12-20',
    dayOfWeek: '수요일',
    amPm: '오전',
    startTime: 9, // 오전 9시
    groomingFee: 80000,
    deliveryFee: 40000,
    monitoringFee: 30000,
    totalPayment: 150000,
    estimateDetail: '견적서 상세 내용입니다.',
    requestDetail: {
      desiredService: '목욕만',
      lastGroomingDate: '2024-10-10',
      isDelivery: true,
      desiredRegion: '서울특별시 송파구',
      isMonitoring: true,
      additionalRequest: '피부 관리가 필요합니다.',
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
