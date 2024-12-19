// src/hooks/useGetPendingRequests.ts

import { useQuery } from '@tanstack/react-query';

import getCompletedRequests, { DesignerCompletedRequest } from '@/apis/request/getCompletedRequest';

export const PENDING_REQUESTS_QUERY_KEY = ['pendingRequests'];

const useGetPendingRequests = () => {
  return useQuery<DesignerCompletedRequest[]>({
    queryKey: PENDING_REQUESTS_QUERY_KEY,
    queryFn: getCompletedRequests,
  });
};

export default useGetPendingRequests;
