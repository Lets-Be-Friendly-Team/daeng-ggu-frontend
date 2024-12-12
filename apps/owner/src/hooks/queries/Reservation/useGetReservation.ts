import { useQuery } from '@tanstack/react-query';

import getReservations from '@/apis/reservation/getReservations';
import { RESERVATION_QUERY_KEYS } from '@/constants/queryKeys';

const useReservation = (customerId: number) => {
  return useQuery({
    queryKey: RESERVATION_QUERY_KEYS.GET_RESERVATION(customerId),
    queryFn: () => getReservations({ customerId }),
    select: (response) => response.data,
  });
};
export default useReservation;
