import { ReservationStatusType } from '@daeng-ggu/shared';
import { useQuery } from '@tanstack/react-query';

import getMonuitoringStatus from '@/apis/monitoring/getMonuitoringStatus';
import { GUADIAN_MONITORING_QUERY_KEYS } from '@/constants/queryKeys';
import { SecondDefaultResponse } from '@/types/api';

const useGetMonitoringStatus = (reservationId: string) => {
  return useQuery<SecondDefaultResponse<ReservationStatusType>>({
    queryKey: GUADIAN_MONITORING_QUERY_KEYS.GET_MONITORING_STATUS(reservationId),
    queryFn: async () => await getMonuitoringStatus(reservationId),
    enabled: !!reservationId,
    refetchInterval: 1000 * 10,
  });
};

export default useGetMonitoringStatus;
