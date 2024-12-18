import { APIClient } from '@daeng-ggu/shared';

export interface DeleteReviewResponse {
  status: string;
  data: null;
  message: string;
}
const deleteReview = async ({ reviewId }: { reviewId: number }): Promise<DeleteReviewResponse> => {
  return await APIClient.delete(`/daengggu/feed`, {
    reviewId: reviewId.toString(),
  });
};
export default deleteReview;
