import { useQuery } from '@tanstack/react-query';

import getReservationInfo from '@/apis/monitoring/getReservationInfo';
import { GUADIAN_MONITORING_QUERY_KEYS } from '@/constants/queryKeys';

const useGetReservationInfo = (reservationId: string) => {
  return useQuery({
    queryKey: GUADIAN_MONITORING_QUERY_KEYS.GET_RESERVATION_INFO(reservationId),
    queryFn: async () => await getReservationInfo(reservationId),
  });
};

export default useGetReservationInfo;
