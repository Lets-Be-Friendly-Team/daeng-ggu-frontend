import { APIClient } from '@daeng-ggu/shared';

export interface DeletePortfolioResponse {
  status: string;
  data: object;
  message: string;
}
const deletePortfolio = async ({
  designerId,
  portfolioId,
}: {
  designerId: number;
  portfolioId: number;
}): Promise<DeletePortfolioResponse> => {
  return await APIClient.delete('/daengggu/designer/portfolio/delete', {
    designerId: designerId.toString(),
    portfolioId: portfolioId.toString(),
  });
};
export default deletePortfolio;
