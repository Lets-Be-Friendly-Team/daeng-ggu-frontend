import { APIClient } from '@daeng-ggu/shared';

export interface ReviewItem {
  designerId: number;
  designerImgUrl: string;
  designerName: string;
  feedExposure: boolean;
  isReviewLike: boolean;
  reviewContents: string;
  reviewId: number;
  reviewImgList: string[];
  reviewLikeCnt: number;
  reviewStar: number;
}
export interface ReviewDetailResponse {
  status: string;
  message: string;
  data: ReviewItem;
}
const getReviewDetail = async ({ reviewId }: { reviewId: number }) => {
  const response = await APIClient.post<ReviewDetailResponse>('/daengggu/feed/customer', {
    reviewId,
  });
  return response;
};
export default getReviewDetail;
