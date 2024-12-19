import { APIClient } from '@daeng-ggu/shared';

const postReviewLike = async (reviewId: number) => {
  return await APIClient.post('/daengggu/feed/like', { reviewId });
};

export default postReviewLike;
