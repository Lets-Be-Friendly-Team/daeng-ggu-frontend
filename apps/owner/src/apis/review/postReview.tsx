import { APIClient } from '@daeng-ggu/shared';

export interface PostReviewResponse {
  status: string;
  data: string;
  message: string;
}

export interface ReviewData {
  designerId: number;
  reviewContents: string;
  reviewStar: number;
  isFeedAdd: boolean;
  FeedImgList: string[]; // 이미지 URL 배열
}

const postReview = async (reviewData: ReviewData): Promise<PostReviewResponse> => {
  return await APIClient.post<PostReviewResponse>('/daengggu/feed', reviewData);
};

export default postReview;
