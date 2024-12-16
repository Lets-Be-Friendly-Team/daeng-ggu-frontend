import { useMutation, useQueryClient } from '@tanstack/react-query';

import postStartDeliveryToHome from '@/apis/monitoring/postStartDeliveryToHome';
import { GUADIAN_MONITORING_QUERY_KEYS } from '@/constants/queryKeys';

const usePostStartDeliveryToHome = (reservationId?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!reservationId) {
        return;
      }
      return await postStartDeliveryToHome(reservationId);
    },
    onSuccess() {
      if (!reservationId) {
        return;
      }
      queryClient.invalidateQueries({
        queryKey: GUADIAN_MONITORING_QUERY_KEYS.GET_MONITORING_STATUS(reservationId),
      });
    },
  });
};

export default usePostStartDeliveryToHome;
