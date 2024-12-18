import { postCreateChannel } from '@daeng-ggu/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { GUADIAN_MONITORING_QUERY_KEYS } from '@/constants/queryKeys';

const useCreateBroadcastChannel = (reservationId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      return postCreateChannel(reservationId);
    },
    onSuccess: () => {
      if (!reservationId) {
        return;
      }
      queryClient.invalidateQueries({ queryKey: GUADIAN_MONITORING_QUERY_KEYS.GET_MONITORING_STATUS(reservationId) });
    },
  });
};

export default useCreateBroadcastChannel;
