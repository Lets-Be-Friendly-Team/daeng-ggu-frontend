import { useQuery } from '@tanstack/react-query';

import getProfile from '@/apis/profile/getProfile';
import { CUSTOMER_QUERY_KEYS } from '@/constants/queryKeys';
const useGetProfile = (customerId: number) => {
  return useQuery({
    queryKey: CUSTOMER_QUERY_KEYS.GET_PROFILE(customerId),
    queryFn: () => getProfile({ customerId }),
    select: (response) => response.data,
  });
};

export default useGetProfile;
