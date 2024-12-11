import { APIClient } from '@daeng-ggu/shared';

import { LoginContentProps } from '@/pages/LoginPage/LoginContent';

export interface LoginResponse {
  data: string;
  status: string;
  message: string;
}

const postRequestStatus = async ({ userType }: LoginContentProps): Promise<LoginResponse> => {
  return await APIClient.post('/daengggu/bid/estimate/customer', { userType });
};

export default postRequestStatus;
