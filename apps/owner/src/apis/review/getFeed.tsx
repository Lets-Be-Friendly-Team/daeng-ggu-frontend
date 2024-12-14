import { APIClient } from '@daeng-ggu/shared';

export interface ReviewItem {
  reviewId: number;
  reviewImgList: string[];
  lastCreatedAt: string;
  designerId: number;
  designerImgUrl: string | undefined;
  designerName: string;
  designerAddress: string;
  customerId: number;
  customerImgUrl: string | undefined;
  customerName: string;
  reviewContents: string;
  reviewStar: number;
  reviewLikeCnt: number;
  isReviewLike: boolean;
  feedExposure: boolean;
  feedUrl: string | null;
}
export interface FeedData {
  totalReview: number;
  reviewList: ReviewItem[];
}
export interface FeedResponse {
  status: string;
  message: string;
  data: FeedData;
}
const getFeed = async ({ page }: { page: number }): Promise<FeedResponse> => {
  return await APIClient.get('/daengggu/feed', {
    page: page.toString(), // API 호출 쿼리 파라미터 수정
  });
};
export default getFeed;
