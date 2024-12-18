import { useMutation, useQueryClient } from '@tanstack/react-query';

import postStartStream from '@/apis/monitoring/postStartStream';
import { GUADIAN_MONITORING_QUERY_KEYS } from '@/constants/queryKeys';

const usePostStartStream = (reservationId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      return await postStartStream(reservationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GUADIAN_MONITORING_QUERY_KEYS.GET_MONITORING_STATUS(reservationId) });
    },
  });
};

export default usePostStartStream;
