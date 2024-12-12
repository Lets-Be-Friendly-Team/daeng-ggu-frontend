import { CategoryTab, Header, PageContainer } from '@daeng-ggu/design-system';

import useGetCompletedRequests from '@/hooks/queries/Request/useGetCompletedRequest';
import useGetPendingRequests from '@/hooks/queries/Request/useGetPendingRequests';
import CompletedRequestDesigner from '@/pages/StatusPage/CompletedRequestDesigner';
import PendingRequest from '@/pages/StatusPage/PendingRequest';

// https://via.placeholder.com/100

const StatusPage = () => {
  // // Fetch pending requests using the custom hook
  const { data: pendingData } = useGetPendingRequests();
  //
  // // Fetch completed requests using the custom hook
  const { data: completedData } = useGetCompletedRequests();
  console.log('hello?: ', completedData);

  // const dummyDataForDesigner = [
  //   {
  //     requestId: 1,
  //     petId: 1,
  //     petName: '장미',
  //     petImageUrl: 'https://via.placeholder.com/100',
  //     desiredServiceCode: '부분미용',
  //     isVisitRequired: true,
  //     majorBreedCode: 'S',
  //     createdAt: '2024-12-02T10:30:00',
  //   },
  //   {
  //     requestId: 2,
  //     petId: 2,
  //     petName: '포돌',
  //     petImageUrl: 'https://via.placeholder.com/100',
  //     desiredServiceCode: '스파',
  //     isVisitRequired: true,
  //     majorBreedCode: 'L',
  //     createdAt: '2024-12-02T10:30:00',
  //   },
  // ];

  // const dummyDataForDesignerCompleted = {
  //   requestList: [
  //     {
  //       petId: 1,
  //       petName: '장미',
  //       petImageUrl: 'https://via.placeholder.com/100',
  //       desiredServiceCode: '부분미용',
  //       lastGroomingDate: '한달전',
  //       desiredDate1: '2023-10-15T10:00:00',
  //       desiredDate2: '2023-10-16T14:00:00',
  //       desiredDate3: '2023-10-17T09:00:00',
  //       desiredRegion: '서울, 강남구',
  //       isVisitRequired: true,
  //       isMonitoringIncluded: false,
  //       additionalRequest: '잘 물어요',
  //     },
  //     {
  //       petId: 2,
  //       petName: '장군',
  //       petImageUrl: 'https://via.placeholder.com/100',
  //       desiredServiceCode: '잔체미용',
  //       lastGroomingDate: '한달전',
  //       desiredDate1: '2023-10-15T10:00:00',
  //       desiredDate2: '2023-10-16T14:00:00',
  //       desiredDate3: '2023-10-17T09:00:00',
  //       desiredRegion: '서울, 강남구',
  //       isVisitRequired: true,
  //       isMonitoringIncluded: false,
  //       additionalRequest: '잘 물다 말아요',
  //     },
  //   ],
  // };

  const tabs = [
    {
      label: '견적서받는 중',
      // content: <PendingRequest data={dummyDataForDesigner} />,
      content: <PendingRequest data={pendingData} />,
    },
    {
      label: '이전견적 조회',
      content: <CompletedRequestDesigner data={completedData} />,
    },
  ];

  return (
    <div className='h-full w-full'>
      <PageContainer>
        <div className='w-full'>
          <Header mode='main' title='견적 조회하기' />
          <CategoryTab tabs={tabs} />
        </div>
      </PageContainer>
    </div>
  );
};

export default StatusPage;
