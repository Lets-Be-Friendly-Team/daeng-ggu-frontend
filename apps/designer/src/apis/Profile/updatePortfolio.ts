import { APIClient } from '@daeng-ggu/shared';

export interface PortfolioResponse {
  status: string;
  data: string;
  message: string;
}
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

const updatePortfolio = async (portfolio: PortfolioData): Promise<PortfolioResponse> => {
  return await APIClient.patch('/daengggu/designer/portfolio/update', portfolio);
};
export default updatePortfolio;
