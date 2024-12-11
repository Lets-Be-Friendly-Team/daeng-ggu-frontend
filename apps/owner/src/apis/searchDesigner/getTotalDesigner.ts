import { APIClient } from '@daeng-ggu/shared';

import { DesignerListType } from '@/components/DesignerInfo/DesignerData';
export interface DesignerResponse {
  data: DesignerListType;
  status: string;
  message: string;
}
const getTotalDesigner = async (): Promise<DesignerResponse> => {
  return await APIClient.get('/daengggu/home');
};
export default getTotalDesigner;
