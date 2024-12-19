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

  const tabs = [
    {
      label: '견적서받는 중',
      // content: <PendingRequest data={dummyDataForDesigner} />,
      content: <PendingRequest data={pendingData || []} />,
    },
    {
      label: '이전견적 조회',
      content: <CompletedRequestDesigner data={completedData || []} />,
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
