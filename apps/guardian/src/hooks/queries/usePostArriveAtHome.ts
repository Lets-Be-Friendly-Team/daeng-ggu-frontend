import { useMutation, useQueryClient } from '@tanstack/react-query';

import postArriveAtHome from '@/apis/monitoring/postArriveAtHome';
import { GUADIAN_MONITORING_QUERY_KEYS } from '@/constants/queryKeys';

const usePostArriveAtHome = (reservationId?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!reservationId) {
        return;
      }
      return await postArriveAtHome(reservationId);
    },
    onSuccess: () => {
      if (!reservationId) {
        return;
      }
      queryClient.invalidateQueries({ queryKey: GUADIAN_MONITORING_QUERY_KEYS.GET_MONITORING_STATUS(reservationId) });
    },
  });
};

export default usePostArriveAtHome;
