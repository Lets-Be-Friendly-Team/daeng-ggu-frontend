import { useQuery } from '@tanstack/react-query';

import getSearchResult, { SearchResponse } from '@/apis/searchDesigner/getSearchResult';
import { SEARCH_QUERY_KEYS } from '@/constants/queryKeys';
import { SearchKeyword } from '@/pages/MainPage/SearchResultPage';

const useGetSearchDesigners = ({ searchWord }: SearchKeyword) => {
  return useQuery<SearchResponse>({
    queryKey: SEARCH_QUERY_KEYS.SEARCH_DESIGNERS(searchWord),
    queryFn: async () => await getSearchResult({ searchWord }),
    enabled: !!searchWord,
  });
};

export default useGetSearchDesigners;
