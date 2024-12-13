import { APIClient } from '@daeng-ggu/shared';

export type UserType = {
  email: string;
  id: number;
  joinYn: string;
  loginId: string;
  refreshToken: string;
  userType: string;
};
export interface UserResponse {
  data: UserType;
  status: string;
  message: string;
}

const getUserInfo = async (): Promise<UserResponse> => {
  return await APIClient.get('/daengggu/login/callback');
};

export default getUserInfo;
