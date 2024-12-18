import { getBroadcastChannel } from '@daeng-ggu/shared';
import { useQuery } from '@tanstack/react-query';

import { GUADIAN_MONITORING_QUERY_KEYS } from '@/constants/queryKeys';

const useGetBroadcastChannel = (reservationId: string) => {
  return useQuery({
    queryKey: GUADIAN_MONITORING_QUERY_KEYS.GET_BRADCAST_CHANNEL(reservationId),
    queryFn: async () => {
      return await getBroadcastChannel(reservationId);
    },
    enabled: !!reservationId,
  });
};

export default useGetBroadcastChannel;
