import { APIClient } from '@daeng-ggu/shared';

export interface UserResponse {
  data: string;
  status: string;
  message: string;
}

const getLogout = async (): Promise<UserResponse> => {
  return await APIClient.get('/daengggu/logout');
};

export default getLogout;
