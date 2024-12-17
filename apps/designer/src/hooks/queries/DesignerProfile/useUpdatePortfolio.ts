import { useMutation } from '@tanstack/react-query';

import updatePortfolio from '@/apis/Profile/updatePortfolio';

export interface PortfolioData {
  designerId: number;
  portfolioId: number;
  title: string;
  contents: string;
  preVideoUrl: string;
  newVideoUrl: string | null;
  preImgUrlList: string[];
  newImgUrlList: string[];
}
const useUpdatePortfolio = () => {
  return useMutation({
    mutationFn: (portfolioData: PortfolioData) => updatePortfolio(portfolioData),
  });
};
export default useUpdatePortfolio;
