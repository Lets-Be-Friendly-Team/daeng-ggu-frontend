import { APIClient } from '@daeng-ggu/shared';

import { IReviewItem } from '@/pages/ReviewDetailPage/ReviewDetailPage';

export interface ReviewDetailResponse {
  status: string;
  message: string;
  data: IReviewItem;
}
const getReviewDetail = async ({ reviewId }: { reviewId: number }): Promise<ReviewDetailResponse> => {
  return await APIClient.get('/daengggu/feed/customer', {
    reviewId: reviewId.toString(),
  });
};
export default getReviewDetail;
