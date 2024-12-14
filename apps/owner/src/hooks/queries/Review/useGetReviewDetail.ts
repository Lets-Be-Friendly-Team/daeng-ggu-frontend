import { useQuery } from '@tanstack/react-query';

import getReviewDetail from '@/apis/review/getReviewDetail';
import { REVIEW_QUERY_KEYS } from '@/constants/queryKeys';

const useGetReviewDetail = (reviewId: number) => {
  return useQuery({
    queryKey: REVIEW_QUERY_KEYS.GET_REVIEW_DETAIL(reviewId),
    queryFn: () => getReviewDetail({ reviewId }),
  });
};
export default useGetReviewDetail;
