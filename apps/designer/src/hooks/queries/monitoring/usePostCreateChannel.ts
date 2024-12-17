import { postCreateChannel } from '@daeng-ggu/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { GUADIAN_MONITORING_QUERY_KEYS } from '@/constants/queryKeys';

const usePostCreateChannel = (reservationId?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: GUADIAN_MONITORING_QUERY_KEYS.POST_CREATE_CHANNEL(reservationId),
    mutationFn: async () => {
      if (!reservationId) {
        return;
      }
      return await postCreateChannel(reservationId);
    },
    onSuccess: () => {
      if (!reservationId) {
        return;
      }
      queryClient.invalidateQueries({ queryKey: GUADIAN_MONITORING_QUERY_KEYS.GET_MONITORING_STATUS(reservationId) });
    },
  });
};

export default usePostCreateChannel;
