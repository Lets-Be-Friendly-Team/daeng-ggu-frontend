import { APIClient } from '@daeng-ggu/shared';

const getUserInfo = async () => {
  return await APIClient.get('/daengggu/login/callback');
};

export default getUserInfo;
