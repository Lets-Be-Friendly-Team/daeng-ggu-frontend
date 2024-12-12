import { APIClient } from '@daeng-ggu/shared';

import { IPortfolio } from '@/pages/DesignerProfilePage/components/Portfolio';

export interface PortfolioDetailResponse {
  status: string;
  message: string;
  data: IPortfolio;
}
const getPortfolioDetail = async ({
  designerId,
  portfolioId,
}: {
  designerId: number;
  portfolioId: number;
}): Promise<PortfolioDetailResponse> => {
  return await APIClient.get('/daengggu/designer/portfolio/detail', {
    designerId: designerId.toString(),
    portfolioId: portfolioId.toString(),
  });
};
export default getPortfolioDetail;
