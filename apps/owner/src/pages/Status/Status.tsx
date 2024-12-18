// src/pages/Status/Status.tsx
import { CategoryTab, Header, PageContainer } from '@daeng-ggu/design-system';

import useGetPendingRequests from '@/hooks/queries/Request/useGetPendingRequests';
import useGetCompletedRequests from '@/hooks/queries/Request/useGetUserCompletedRequests';
import CompletedRequestUser from '@/pages/Status/CompletedRequestUser';
import PendingRequest from '@/pages/Status/PendingRequest';

const Status = () => {
  // Fetch pending requests using the custom hook
  const { data: pendingData, isLoading: isPendingLoading, error: pendingError } = useGetPendingRequests();

  // Fetch completed requests using the custom hook
  const { data: completedData, isLoading: isCompletedLoading, error: completedError } = useGetCompletedRequests();

  // Handle loading states
  if (isPendingLoading || isCompletedLoading) {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <p>Loading...</p>
      </div>
    );
  }

  // Handle error states
  if (pendingError || completedError) {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <p>Error fetching requests.</p>
      </div>
    );
  }

  const tabs = [
    {
      label: '견적서받는 중',
      content: <PendingRequest data={pendingData!} />, // Non-null assertion since data is loaded
    },
    {
      label: '이전견적 조회',
      content: <CompletedRequestUser data={completedData!} />,
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
