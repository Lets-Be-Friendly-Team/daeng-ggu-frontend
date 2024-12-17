import { useQuery } from '@tanstack/react-query';

import getPortfolioDetail from '@/apis/Profile/getPortfolioDetail';
import { DESIGNER_QUERY_KEYS } from '@/constants/queryKeys';

const useGetPortfolioDetail = (designerId: number, portfolioId: number) => {
  return useQuery({
    queryKey: DESIGNER_QUERY_KEYS.GET_PORTFOLIO_DETAIL(designerId, portfolioId),
    queryFn: () => getPortfolioDetail({ designerId, portfolioId }),
    select: (response) => response.data,
  });
};
export default useGetPortfolioDetail;
