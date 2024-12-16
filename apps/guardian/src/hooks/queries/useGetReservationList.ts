import { useQuery } from '@tanstack/react-query';

import getReservationList from '@/apis/monitoring/getReservationList';
import { GUADIAN_MONITORING_QUERY_KEYS } from '@/constants/queryKeys';
import { DefaultResponse } from '@/types/api';
import { ReservationType } from '@/types/reservation';

const useGetReservationList = () => {
  return useQuery<DefaultResponse<ReservationType>>({
    queryKey: GUADIAN_MONITORING_QUERY_KEYS.GET_RESERVATION_LIST,
    queryFn: async () => await getReservationList(),
  });
};

export default useGetReservationList;
