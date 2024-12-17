import { getBroadcastChannel } from '@daeng-ggu/shared';
import { useQuery } from '@tanstack/react-query';

import { GUADIAN_MONITORING_QUERY_KEYS } from '@/constants/queryKeys';

const useGetBroadcastChannel = (reservationId: string) => {
  return useQuery({
    queryKey: GUADIAN_MONITORING_QUERY_KEYS.GET_BROADCAST_CHANNEL(reservationId),
    queryFn: async () => await getBroadcastChannel(reservationId),
  });
};

export default useGetBroadcastChannel;
