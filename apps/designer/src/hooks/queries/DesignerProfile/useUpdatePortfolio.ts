import { useMutation } from '@tanstack/react-query';

import updatePortfolio, { PortfolioData } from '@/apis/Profile/updatePortfolio';

const useUpdatePortfolio = () => {
  return useMutation({
    mutationFn: (portfolioData: PortfolioData) => updatePortfolio(portfolioData),
  });
};
export default useUpdatePortfolio;
