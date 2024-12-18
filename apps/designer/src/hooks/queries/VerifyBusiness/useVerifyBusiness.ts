import { useQuery } from '@tanstack/react-query';

import verifyBusiness, { VerifyResponse } from '@/apis/verifyBusiness/verifyBusiness';
import { BUSINESS_QUERY_KEYS } from '@/constants/queryKeys';
import { BusinessForm } from '@/pages/RegisterProfile/Step3';

const useVerifyBusiness = ({ businessNumber, representativeName, startDate }: BusinessForm) => {
  return useQuery<VerifyResponse>({
    queryKey: BUSINESS_QUERY_KEYS.GET_VERIFY_BUSINESS(businessNumber, representativeName, startDate),
    queryFn: async () => await verifyBusiness({ businessNumber, representativeName, startDate }),
    enabled: !!businessNumber && !!representativeName && !!startDate,
  });
};

export default useVerifyBusiness;
