import { useQuery } from '@tanstack/react-query';

import getDesignerProfile from '@/apis/designerProfile/getDesignerProfile';
import { DESIGNER_QUERY_KEYS } from '@/constants/queryKeys';

const useGetDesignerProfile = (designerId: number) => {
  return useQuery({
    queryKey: DESIGNER_QUERY_KEYS.GET_DESIGNER_PROFILE(designerId),
    queryFn: () => getDesignerProfile({ designerId }),
    select: (data) => data.data,
  });
};

export default useGetDesignerProfile;
