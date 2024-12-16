import { useMutation } from '@tanstack/react-query';

import deleteReview from '@/apis/review/deleteReview';

const useDeleteReview = () => {
  return useMutation({
    mutationFn: ({ reviewId }: { reviewId: number }) => deleteReview({ reviewId }),
    onSuccess: (data) => {
      console.log('Review deleted successfully:', data);
    },
    onError: (error) => {
      console.error('Failed to delete review:', error);
    },
  });
};
export default useDeleteReview;
