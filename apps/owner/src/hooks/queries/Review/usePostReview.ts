import { useMutation } from '@tanstack/react-query';

import postReview, { ReviewData } from '@/apis/review/postReview';

const usePostReview = () => {
  return useMutation({
    mutationFn: (reviewData: ReviewData) => postReview(reviewData),
  });
};
export default usePostReview;
