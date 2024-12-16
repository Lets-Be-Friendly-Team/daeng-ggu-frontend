import { useMutation, useQueryClient } from '@tanstack/react-query';

import postStartDeliveryToShop from '@/apis/monitoring/postStartDeliveryToShop';
import { GUADIAN_MONITORING_QUERY_KEYS } from '@/constants/queryKeys';

const usePostStartDeliveryToShop = (reservationId?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!reservationId) {
        return;
      }
      return await postStartDeliveryToShop(reservationId);
    },
    onSuccess: () => {
      if (!reservationId) {
        return;
      }
      queryClient.invalidateQueries({ queryKey: GUADIAN_MONITORING_QUERY_KEYS.GET_MONITORING_STATUS(reservationId) });
    },
  });
};

export default usePostStartDeliveryToShop;
