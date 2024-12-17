import { getPlaybackUrl } from '@daeng-ggu/shared';
import { useQuery } from '@tanstack/react-query';

import { GUADIAN_MONITORING_QUERY_KEYS } from '@/constants/queryKeys';

const useGetPlaybackUrl = (reservationId: string) => {
  return useQuery({
    queryKey: GUADIAN_MONITORING_QUERY_KEYS.GET_PLAYBACK_URL(reservationId),
    queryFn: async () => await getPlaybackUrl(reservationId),
    enabled: !!reservationId,
  });
};

export default useGetPlaybackUrl;
