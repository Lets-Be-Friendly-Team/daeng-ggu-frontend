import { APIClient } from '@daeng-ggu/shared';

import { LoginContentProps } from '@/pages/LoginPage/LoginContent';

export interface LoginResponse {
  data: string;
  status: string;
  message: string;
}

const getLogin = async ({ userType }: LoginContentProps): Promise<LoginResponse> => {
  // return await APIClient.get('/daengggu/login', { userType });
  return await APIClient.get('/daengggu/login', { userType });
};

export default getLogin;
