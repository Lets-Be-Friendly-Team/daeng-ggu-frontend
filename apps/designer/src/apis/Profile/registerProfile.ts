import { APIClient } from '@daeng-ggu/shared';

import { DesignerData } from '@/pages/RegisterProfile/RegisterProfileData';

export interface RegisterProfileResponse {
  status: string;
  message: string;
  data: object;
}

const registerProfile = async (profileData: DesignerData): Promise<RegisterProfileResponse> => {
  return await APIClient.post('/daengggu/designer/register/profile', profileData);
};

export default registerProfile;
