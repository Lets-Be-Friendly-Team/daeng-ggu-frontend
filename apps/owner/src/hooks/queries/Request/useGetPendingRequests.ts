// src/hooks/useGetPendingRequests.ts

import { useQuery } from '@tanstack/react-query';

import getPendingRequests, { PetProfile } from '@/apis/request/getPendingRequests';

export const PENDING_REQUESTS_QUERY_KEY = ['pendingRequests'];

const useGetPendingRequests = () => {
  return useQuery<PetProfile[]>({
    queryKey: PENDING_REQUESTS_QUERY_KEY,
    queryFn: getPendingRequests,
  });
};

export default useGetPendingRequests;
