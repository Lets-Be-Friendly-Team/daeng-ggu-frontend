import { useMutation } from '@tanstack/react-query';

import patchReview, { ReviewData } from '@/apis/review/patchReview';

const usePatchReview = () => {
  return useMutation({
    mutationFn: (reviewData: ReviewData) => patchReview(reviewData),
  });
};
export default usePatchReview;
