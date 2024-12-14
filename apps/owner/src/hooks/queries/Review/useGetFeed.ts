import { useQuery } from '@tanstack/react-query';

import getFeed from '@/apis/review/getFeed';
// import { FeedResponse } from '@/apis/review/getFeed';
import { REVIEW_QUERY_KEYS } from '@/constants/queryKeys';

// const useGetFeed = () => {
//   return useInfiniteQuery<FeedResponse, Error>({
//     queryKey: [REVIEW_QUERY_KEYS.GET_REVIEW], // Query Key
//     queryFn: ({ pageParam = 0 }: { pageParam?: number }) => {
//       return getFeed({ page: pageParam }); // pageParam으로 페이지 처리
//     },
//     getNextPageParam: (lastPage, allPages) => {
//       const { totalReview, reviewList } = lastPage.data;

//       // 다음 페이지 계산
//       if (reviewList.length === 0) return undefined;

//       const totalPages = Math.ceil(totalReview / 10); // 총 페이지 수
//       const currentPage = allPages.length; // 현재까지 가져온 페이지 수

//       return currentPage < totalPages ? currentPage + 1 : undefined;
//     },
//   });
// };

const useGetFeed = (page: number) => {
  return useQuery({
    queryKey: REVIEW_QUERY_KEYS.GET_FEED(page),
    queryFn: () => getFeed({ page }),
    select: (response) => response.data,
  });
};

export default useGetFeed;
