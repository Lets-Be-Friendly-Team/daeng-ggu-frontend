import { useQuery } from '@tanstack/react-query';

import getTotalDesigner, { DesignerResponse } from '@/apis/searchDesigner/getTotalDesigner';
import { DESIGNER_QUERY_KEYS } from '@/constants/queryKeys';

const useGetTotalDesigners = () => {
  return useQuery<DesignerResponse>({
    queryKey: DESIGNER_QUERY_KEYS.TOTAL_DESIGNERS,
    queryFn: async () => await getTotalDesigner(),
    // staleTime:1000*60*5,    // 5분 동안 데이터 캐시 유지
  });
};

export default useGetTotalDesigners;
