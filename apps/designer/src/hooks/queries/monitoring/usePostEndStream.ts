import { useMutation, useQueryClient } from '@tanstack/react-query';

import postEndStream from '@/apis/monitoring/postEndStream';
import { GUADIAN_MONITORING_QUERY_KEYS } from '@/constants/queryKeys';

const usePostEndStream = (reservationId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      return await postEndStream(reservationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GUADIAN_MONITORING_QUERY_KEYS.GET_MONITORING_STATUS(reservationId) });
    },
  });
};

export default usePostEndStream;
