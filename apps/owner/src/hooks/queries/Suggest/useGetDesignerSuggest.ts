import { useSuspenseQuery } from '@tanstack/react-query';

import { PostSuggestResponse } from '@/apis/suggest/postSuggestRequest';
import { postSuggestRequest } from '@/apis/suggest/postSuggestRequest.ts';

interface UsePostSuggestPageOptions {
  estimateId?: number;
}

const useGetDesignerSuggest = (options: UsePostSuggestPageOptions) => {
  const { estimateId } = options;

  if (!estimateId) {
    throw new Error('requestId is required to fetch post detail page data');
  }

  return useSuspenseQuery<PostSuggestResponse, Error>({
    queryKey: ['postDetailPage', estimateId] as const,
    queryFn: () => postSuggestRequest({ estimateId }),
  });
};
export default useGetDesignerSuggest;
