import { APIClient } from '@daeng-ggu/shared';

export interface ReviewItem {
  reviewId: number;
  designerId: number;
  designerImgUrl: string;
  designerAddress: string;
  nickname: string;
  feedExposure: boolean;
  isReviewLike: boolean;
  reviewContents: string;
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
