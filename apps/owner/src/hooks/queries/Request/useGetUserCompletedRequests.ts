// src/hooks/request/useGetUserCompletedRequests.ts

import { useQuery } from '@tanstack/react-query';

import getCompletedRequests, { CompletedRequest } from '@/apis/request/getCompletedRequests';

export const USER_COMPLETED_REQUESTS_QUERY_KEY = ['userCompletedRequests'];

const useGetUserCompletedRequests = () => {
  return useQuery<CompletedRequest[], Error>({
    queryKey: USER_COMPLETED_REQUESTS_QUERY_KEY,
    queryFn: getCompletedRequests,
  });
};

export default useGetUserCompletedRequests;
