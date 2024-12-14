import { APIClient } from '@daeng-ggu/shared';

export interface ReviewItem {
  reviewId: number;
  reviewImgUrl1: string | null;
  reviewImgUrl2: string | null;
  reviewImgUrl3: string | null;
  lastCreatedAt: string; // ISO 8601 형식의 날짜 문자열
  designerId: number;
  designerImgUrl: string | null;
  designerName: string;
  customerId: number;
  customerImgUrl: string | null;
  customerName: string;
  reviewContents: string;
  reviewStar: number;
  reviewLikeCnt: number;
  isReviewLike: boolean;
  feedExposure: boolean;
  feedUrl: string | null;
  feedImgList: string[];
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
  return await APIClient.get('/daengggu/feed', { page: page.toString() });
};
export default getFeed;
