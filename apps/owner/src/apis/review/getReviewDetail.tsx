import { APIClient } from '@daeng-ggu/shared';

import { IReviewItem } from '@/pages/ReviewDetailPage/ReviewDetailPage';

export interface ReviewDetailResponse {
  status: string;
  message: string;
  data: IReviewItem;
}
const getReviewDetail = async ({ reviewId }: { reviewId: number }) => {
  try {
    const response = await APIClient.post<ReviewDetailResponse>('/daengggu/feed/customer', {
      reviewId,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error('리뷰 상세 정보를 가져오는 중 오류 발생:', error);
    throw new Error('리뷰 상세 정보를 가져오는 데 실패했습니다.');
  }
};
export default getReviewDetail;
