// src/hooks/useGetPendingRequests.ts

import { useSuspenseQuery } from '@tanstack/react-query';

import getPendingRequests, { PetProfile } from '@/apis/request/getPendingRequests';

export const PENDING_REQUESTS_QUERY_KEY = ['pendingRequests'];

const useGetPendingRequests = () => {
  return useSuspenseQuery<PetProfile[]>({
    queryKey: PENDING_REQUESTS_QUERY_KEY,
    queryFn: getPendingRequests,
  });
};

export default useGetPendingRequests;
