import { useMutation, useQueryClient } from '@tanstack/react-query';

import postArriveAtShop from '@/apis/monitoring/postArriveAtShop';
import { GUADIAN_MONITORING_QUERY_KEYS } from '@/constants/queryKeys';

const usePostArriveAtShop = (reservationId?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!reservationId) {
        return;
      }
      return await postArriveAtShop(reservationId);
    },
    onSuccess: () => {
      if (!reservationId) {
        return;
      }
      queryClient.invalidateQueries({ queryKey: GUADIAN_MONITORING_QUERY_KEYS.GET_MONITORING_STATUS(reservationId) });
    },
  });
};

export default usePostArriveAtShop;
