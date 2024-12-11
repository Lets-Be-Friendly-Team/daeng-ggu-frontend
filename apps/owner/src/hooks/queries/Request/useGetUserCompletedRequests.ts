// src/hooks/request/useGetUserCompletedRequests.ts
import { useSuspenseQuery } from '@tanstack/react-query';

import getCompletedRequests, { CompletedRequest } from '@/apis/request/getCompletedRequests.tsx';

export const USER_COMPLETED_REQUESTS_QUERY_KEY = ['userCompletedRequests'];

const useGetUserCompletedRequests = () => {
  return useSuspenseQuery<CompletedRequest[], Error>({
    queryKey: USER_COMPLETED_REQUESTS_QUERY_KEY,
    queryFn: async () => await getCompletedRequests(),
  });
};

export default useGetUserCompletedRequests;
