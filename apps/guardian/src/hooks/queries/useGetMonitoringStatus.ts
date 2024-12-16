import { useQuery } from '@tanstack/react-query';

import getMonitoringStatus from '@/apis/monitoring/getMonitoringStatus';
import { GUADIAN_MONITORING_QUERY_KEYS } from '@/constants/queryKeys';
import { SecondDefaultResponse } from '@/types/api';
import { ReservationStatusType } from '@/types/reservation';

const useGetMonitoringStatus = (reservationId: string) => {
  return useQuery<SecondDefaultResponse<ReservationStatusType>>({
    queryKey: GUADIAN_MONITORING_QUERY_KEYS.GET_MONITORING_STATUS(reservationId),
    queryFn: async () => await getMonitoringStatus(reservationId),
    staleTime: 0,
    enabled: !!reservationId,
  });
};

export default useGetMonitoringStatus;
