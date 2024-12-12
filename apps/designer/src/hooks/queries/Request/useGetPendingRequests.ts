// src/hooks/useGetPendingRequests.ts

import { useSuspenseQuery } from '@tanstack/react-query';

import getPendingRequests, { DesignerRequest } from '@/apis/request/getPendingRequest';

export const PENDING_REQUESTS_QUERY_KEY = ['pendingRequests'];

const useGetPendingRequests = () => {
  return useSuspenseQuery<DesignerRequest[]>({
    queryKey: PENDING_REQUESTS_QUERY_KEY,
    queryFn: getPendingRequests,
  });
};

export default useGetPendingRequests;
