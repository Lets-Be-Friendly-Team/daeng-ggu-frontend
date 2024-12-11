import { CategoryTab, Header, PageContainer } from '@daeng-ggu/design-system';

import useGetPendingRequests from '@/hooks/queries/Request/useGetPendingRequests';
import useGetCompletedRequests from '@/hooks/queries/Request/useGetUserCompletedRequests';
import CompletedRequestUser from '@/pages/Status/CompletedRequestUser.tsx';
import PendingRequest from '@/pages/Status/PendingRequest';

// https://via.placeholder.com/100

const Status = () => {
  // Fetch pending requests using the custom hook
  const { data: pendingData } = useGetPendingRequests();

  // Fetch completed requests using the custom hook
  const { data: completedData } = useGetCompletedRequests();

  const tabs = [
    {
      label: '견적서받는 중',
      content: <PendingRequest data={pendingData} />,
    },
    {
      label: '이전견적 조회',
      content: <CompletedRequestUser data={completedData} />,
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

export default Status;
