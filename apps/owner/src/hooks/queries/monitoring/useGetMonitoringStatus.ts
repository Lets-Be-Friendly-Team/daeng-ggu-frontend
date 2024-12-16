import { useQuery } from '@tanstack/react-query';

import getMonuitoringStatus from '@/apis/monitoring/getMonuitoringStatus';
import { GUADIAN_MONITORING_QUERY_KEYS } from '@/constants/queryKeys';

const useGetMonitoringStatus = (reservationId: string) => {
  return useQuery({
    queryKey: GUADIAN_MONITORING_QUERY_KEYS.GET_MONITORING_STATUS(reservationId),
    queryFn: async () => await getMonuitoringStatus(reservationId),
    enabled: !!reservationId,
  });
};

export default useGetMonitoringStatus;
