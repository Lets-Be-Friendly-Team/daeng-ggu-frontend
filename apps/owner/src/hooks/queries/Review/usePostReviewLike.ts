import { useToast } from '@daeng-ggu/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { FeedData } from '@/apis/review/getFeed';
import postReviewLike from '@/apis/review/postReviewLike';
import { REVIEW_QUERY_KEYS } from '@/constants/queryKeys';

const usePostReviewLike = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  return useMutation({
    mutationFn: async (reviewId: number) => {
      return await postReviewLike(reviewId);
    },
    onMutate: async (reviewId: number) => {
      await queryClient.cancelQueries({ queryKey: REVIEW_QUERY_KEYS.GET_FEED(0) });

      const previousData = queryClient.getQueryData(REVIEW_QUERY_KEYS.GET_FEED(0));

      queryClient.setQueryData(REVIEW_QUERY_KEYS.GET_FEED(0), (old: FeedData) => {
        return {
          ...old,
          reviewList: old.reviewList.map((review) => {
            if (review.reviewId === reviewId) {
              return {
                ...review,
                isReviewLike: !review.isReviewLike,
                reviewLikeCount: review.isReviewLike ? review.reviewLikeCnt - 1 : review.reviewLikeCnt + 1,
              };
            }
            return review;
          }),
        };
      });

      return { previousData };
    },

    onError: () => {
      showToast({ message: '리뷰 좋아요에 실패했습니다! 다시 시도해주세요.', type: 'error' });
    },
  });
};

export default usePostReviewLike;
