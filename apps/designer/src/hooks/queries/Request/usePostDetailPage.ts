import { useSuspenseQuery } from '@tanstack/react-query';

import { BidRequestResponse, postDetailPage } from '@/apis/request/postDetailPage';

interface UsePostDetailPageOptions {
  requestId?: number;
}

const usePostDetailPage = (options: UsePostDetailPageOptions) => {
  const { requestId } = options;

  if (!requestId) {
    throw new Error('requestId is required to fetch post detail page data');
  }

  return useSuspenseQuery<BidRequestResponse, Error>({
    queryKey: ['postDetailPage', requestId] as const,
    queryFn: () => postDetailPage({ requestId }),
  });
};

export default usePostDetailPage;
