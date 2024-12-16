import { useQuery } from '@tanstack/react-query';

import getReservations from '@/apis/reservation/getReservations';
import { RESERVATION_QUERY_KEYS } from '@/constants/queryKeys';

const useReservation = () => {
  return useQuery({
    queryKey: RESERVATION_QUERY_KEYS.GET_RESERVATION,
    queryFn: () => getReservations(),
    select: (response) => response.data,
  });
};
export default useReservation;
