import { useQuery } from '@tanstack/react-query';

import getBookmark from '@/apis/profile/getBookmark';
import { CUSTOMER_QUERY_KEYS } from '@/constants/queryKeys';

const useGetBookmark = (customerId: number, designerId: number, bookmarkYn: boolean) => {
  return useQuery({
    queryKey: CUSTOMER_QUERY_KEYS.GET_BOOKMARK(customerId, designerId, bookmarkYn),
    queryFn: () => getBookmark({ customerId, designerId, bookmarkYn }),
  });
};
export default useGetBookmark;
