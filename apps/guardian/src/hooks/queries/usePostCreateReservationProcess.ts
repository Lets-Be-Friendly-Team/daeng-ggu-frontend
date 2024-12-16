import { useMutation, useQueryClient } from '@tanstack/react-query';

import postCreateReservationProcess from '@/apis/monitoring/postCreateReservationProcess';
import { GUADIAN_MONITORING_QUERY_KEYS } from '@/constants/queryKeys';

const usePostCreateReservationProcess = (reservationId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => await postCreateReservationProcess(reservationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GUADIAN_MONITORING_QUERY_KEYS.GET_RESERVATION_LIST });
    },
  });
};

export default usePostCreateReservationProcess;
