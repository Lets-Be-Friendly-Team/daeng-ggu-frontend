// src/hooks/useGetPendingRequests.ts

import { useSuspenseQuery } from '@tanstack/react-query';

import getCompletedRequests, { DesignerCompletedRequest } from '@/apis/request/getCompletedRequest';

export const PENDING_REQUESTS_QUERY_KEY = ['pendingRequests'];

const useGetPendingRequests = () => {
  return useSuspenseQuery<DesignerCompletedRequest[]>({
    queryKey: PENDING_REQUESTS_QUERY_KEY,
    queryFn: getCompletedRequests,
  });
};

export default useGetPendingRequests;
