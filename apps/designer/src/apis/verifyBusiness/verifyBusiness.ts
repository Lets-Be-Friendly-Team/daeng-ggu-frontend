import { APIClient } from '@daeng-ggu/shared';

import { BusinessForm } from '@/pages/RegisterProfile/Step3';
export interface VerifyResponse {
  data: string;
  status: string;
  message: string;
}

const verifyBusiness = async ({
  businessNumber,
  representativeName,
  startDate,
}: BusinessForm): Promise<VerifyResponse> => {
  return await APIClient.get('/daengggu/designer/profile/verify/business', {
    businessNumber,
    representativeName,
    startDate,
  });
};
export default verifyBusiness;
