import { useQuery } from '@tanstack/react-query';

import getDesignerProfile from '@/apis/designerProfile/getDesignerProfile';
import { DESIGNER_QUERY_KEYS } from '@/constants/queryKeys';

const useGetDesignerProfile = (designerId: number, customerId: number) => {
  return useQuery({
    queryKey: DESIGNER_QUERY_KEYS.GET_DESIGNER_PROFILE(designerId, customerId),
    queryFn: () => getDesignerProfile({ designerId, customerId }),
    select: (response) => response.data,
  });
};

export default useGetDesignerProfile;
