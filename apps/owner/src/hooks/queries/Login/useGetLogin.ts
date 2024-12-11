import { useQuery } from '@tanstack/react-query';

import getLogin, { LoginResponse } from '@/apis/login/getLogin';
import { LOGIN_QUERY_KEYS } from '@/constants/queryKeys';
import { LoginContentProps } from '@/pages/LoginPage/LoginContent';

/**
 * 이 훅은 useQuery에시입니다. 사용하지 않습니다.
 */
const useGetLogin = ({ userType }: LoginContentProps) => {
  return useQuery<LoginResponse>({
    queryKey: LOGIN_QUERY_KEYS.LOGIN(userType),
    queryFn: async () => await getLogin({ userType }),
    enabled: true,
    // staleTime: 1000 * 60 * 60 * 24, 캐시가 만료되기 전까지 데이터를 사용
  });
};

export default useGetLogin;
