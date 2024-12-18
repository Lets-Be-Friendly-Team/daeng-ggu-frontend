import { useQuery } from '@tanstack/react-query';

import getProfileDetail from '@/apis/Profile/getProfileDetail';
import { DESIGNER_QUERY_KEYS } from '@/constants/queryKeys';

const useGetProfileDetail = (designerId: number) => {
  return useQuery({
    queryKey: DESIGNER_QUERY_KEYS.GET_PROFILE_DETAIL(designerId),
    queryFn: () => getProfileDetail({ designerId }),
    select: (response) => response.data,
  });
};
export default useGetProfileDetail;
