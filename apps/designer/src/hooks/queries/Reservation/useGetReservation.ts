import { useQuery } from '@tanstack/react-query';

import getReservations from '@/apis/reservation/getReservation';
import { RESERVATION_QUERY_KEYS } from '@/constants/queryKeys';

const useReservation = (designerId: number) => {
  return useQuery({
    queryKey: RESERVATION_QUERY_KEYS.GET_RESERVATION(designerId),
    queryFn: () => getReservations({ designerId }),
    select: (response) => response.data,
  });
};
export default useReservation;
