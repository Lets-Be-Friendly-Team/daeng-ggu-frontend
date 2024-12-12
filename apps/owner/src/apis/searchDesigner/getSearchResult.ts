import { APIClient } from '@daeng-ggu/shared';

import { DesignerListType } from '@/components/DesignerInfo/DesignerData';
import { SearchKeyword } from '@/pages/MainPage/SearchResultPage';
export interface SearchResponse {
  data: DesignerListType;
  status: string;
  message: string;
}
// interface SearchKeyword {
//   keyword: string;
// }
const getSearchResult = async ({ searchWord }: SearchKeyword): Promise<SearchResponse> => {
  return await APIClient.get('/daengggu/home', { searchWord });
};
export default getSearchResult;
