import { useQuery } from '@tanstack/react-query';

import getReservationInfo from '@/apis/reservation/getReservationInfo';
import { GUADIAN_MONITORING_QUERY_KEYS } from '@/constants/queryKeys';
import { SecondDefaultResponse } from '@/types/api';
import { ReservationInfo } from '@/types/reservation';

const useGetReservationInfo = (reservationId: string) => {
  return useQuery<SecondDefaultResponse<ReservationInfo>>({
    queryKey: GUADIAN_MONITORING_QUERY_KEYS.GET_RESERVATION_INFO(reservationId),
    queryFn: async () => await getReservationInfo(reservationId),
  });
};

export default useGetReservationInfo;
