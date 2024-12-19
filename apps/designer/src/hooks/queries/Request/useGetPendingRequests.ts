// src/hooks/useGetPendingRequests.ts

import { useQuery } from '@tanstack/react-query';

import getPendingRequests, { DesignerRequest } from '@/apis/request/getPendingRequest';

export const PENDING_REQUESTS_QUERY_KEY = ['pendingRequests'];

const useGetPendingRequests = () => {
  return useQuery<DesignerRequest[]>({
    queryKey: PENDING_REQUESTS_QUERY_KEY,
    queryFn: getPendingRequests,
  });
};

export default useGetPendingRequests;
