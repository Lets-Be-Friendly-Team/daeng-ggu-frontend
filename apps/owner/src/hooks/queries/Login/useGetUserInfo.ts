import { useQuery } from '@tanstack/react-query';

import getUserInfo, { UserResponse } from '@/apis/login/getUserInfo';
import { USER_QUERY_KEYS } from '@/constants/queryKeys';

const useGetUserInfo = () => {
  return useQuery<UserResponse>({
    queryKey: USER_QUERY_KEYS.GET_USER,
    queryFn: async () => await getUserInfo(),
    staleTime: 0,
  });
};

export default useGetUserInfo;
