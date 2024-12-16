import { useMutation } from '@tanstack/react-query';

import deletePortfolio from '@/apis/profile/deletePortfolio';

const useDeletePortfolio = () => {
  return useMutation({
    mutationFn: ({ designerId, portfolioId }: { designerId: number; portfolioId: number }) =>
      deletePortfolio({ designerId, portfolioId }),
    onSuccess: (data) => {
      console.log('Review deleted successfully:', data);
    },
    onError: (error) => {
      console.error('Failed to delete review:', error);
    },
  });
};
export default useDeletePortfolio;
