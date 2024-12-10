import { useQuery } from '@tanstack/react-query';

import getProfileDetail from '@/apis/profile/getProfileDetail';
import { CUSTOMER_QUERY_KEYS } from '@/constants/queryKeys';

const useGetProfileDetail = (customerId: number) => {
  return useQuery({
    queryKey: CUSTOMER_QUERY_KEYS.GET_PROFILE_DETAIL(customerId),
    queryFn: () => getProfileDetail({ customerId }),
    select: (data) => data.data,
  });
};

export default useGetProfileDetail;
