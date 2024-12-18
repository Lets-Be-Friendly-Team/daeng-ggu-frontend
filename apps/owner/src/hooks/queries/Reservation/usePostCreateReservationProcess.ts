import { useMutation, useQueryClient } from '@tanstack/react-query';

import postCreateReservationProcess from '@/apis/reservation/postCreateReservationProcess';
import { RESERVATION_QUERY_KEYS } from '@/constants/queryKeys';

const usePostCreateReservationProcess = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (reservationId: number) => await postCreateReservationProcess(reservationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RESERVATION_QUERY_KEYS.GET_RESERVATION });
    },
  });
};

export default usePostCreateReservationProcess;
