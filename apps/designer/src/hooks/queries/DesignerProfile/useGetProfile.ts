import { useQuery } from '@tanstack/react-query';

import getProfile from '@/apis/Profile/getProfile';
import { DESIGNER_QUERY_KEYS } from '@/constants/queryKeys';

const useGetProfile = (designerId: number) => {
  return useQuery({
    queryKey: DESIGNER_QUERY_KEYS.GET_PROFILE(designerId),
    queryFn: () => getProfile({ designerId }),
    select: (response) => response.data,
  });
};
export default useGetProfile;
