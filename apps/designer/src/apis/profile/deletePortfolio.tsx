import { APIClient } from '@daeng-ggu/shared';

export interface DeletePortfolioResponse {
  status: string;
  data: null;
  message: string;
}
const deletePortfolio = async ({
  designerId,
  portfolioId,
}: {
  designerId: number;
  portfolioId: number;
}): Promise<DeletePortfolioResponse> => {
  return await APIClient.delete(`/daengggu/designer/portfolio/delete/${designerId}/${portfolioId}`);
};
export default deletePortfolio;
