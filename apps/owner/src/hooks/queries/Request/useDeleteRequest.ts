import { useMutation, useQueryClient } from '@tanstack/react-query';

import deleteRequest from '@/apis/request/deleteRequest';
import { PENDING_REQUESTS_QUERY_KEY } from '@/hooks/queries/Request/useGetPendingRequests';

const useDeleteRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (requestId: number) => {
      return await deleteRequest(requestId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PENDING_REQUESTS_QUERY_KEY });
    },
  });
};

export default useDeleteRequest;
