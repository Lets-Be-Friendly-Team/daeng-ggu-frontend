import { useQuery } from '@tanstack/react-query';

import getReservationOwnerInfo from '@/apis/monitoring/getReservationOwnerInfo';
import { GUADIAN_MONITORING_QUERY_KEYS } from '@/constants/queryKeys';
import { SecondDefaultResponse } from '@/types/api';
import { OwnerInfoType } from '@/types/reservation';

const useGetReservationOwnerInfo = (reservationId: string) => {
  return useQuery<SecondDefaultResponse<OwnerInfoType>>({
    queryKey: GUADIAN_MONITORING_QUERY_KEYS.GET_RESERVATION_OWNER_INFO(reservationId),
    queryFn: async () => {
      return await getReservationOwnerInfo(reservationId);
    },
    enabled: !!reservationId,
  });
};

export default useGetReservationOwnerInfo;
