import { APIClient } from '@daeng-ggu/shared';

export interface PatchReviewResponse {
  status: string;
  data: string;
  message: string;
}

export interface ReviewData {
  reviewId: number;
  reviewContents: string;
  reviewStar: number;
  isFeedAdd: boolean;
  existImgList: string[];
  FeedImgList: string[]; // 이미지 URL 배열
}
const patchReview = async (reviewData: ReviewData): Promise<PatchReviewResponse> => {
  return await APIClient.patch<PatchReviewResponse>('/daengggu/feed', reviewData);
};
export default patchReview;
