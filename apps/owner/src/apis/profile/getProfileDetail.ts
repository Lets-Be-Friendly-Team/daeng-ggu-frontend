import { APIClient } from '@daeng-ggu/shared';
export interface PreProfileData {
  customerId: number;
  customerName: string;
  customerImgUrl: string;
  birthDate: string;
  gender: string;
  phone: string;
  nickname: string;
  address1: string;
  address2: string;
  detailAddress: string;
}
export interface PreProfileDataResponse {
  status: string;
  message: string;
  data: PreProfileData;
}
const getProfileDetail = async ({ customerId }: { customerId: number }): Promise<PreProfileDataResponse> => {
  return await APIClient.get('/daengggu/customer/profile/detail', { customerId: customerId.toString() });
};
export default getProfileDetail;
