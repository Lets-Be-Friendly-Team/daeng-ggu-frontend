import { APIClient } from '@daeng-ggu/shared';

import { DesignerListType } from '@/components/DesignerInfo/DesignerData';
export interface DesignerResponse {
  data: DesignerListType;
  status: string;
  message: string;
}
interface SearchKeyword {
  keyword: string;
}
const getSearchResult = async ({ keyword }: SearchKeyword): Promise<DesignerResponse> => {
  return await APIClient.get('/daengggu/home', { keyword });
};
export default getSearchResult;
