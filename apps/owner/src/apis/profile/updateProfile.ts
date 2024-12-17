import { APIClient } from '@daeng-ggu/shared';

export interface UpdatedProfileDataResponse {
  status: string;
  message: string;
  data: string;
}
export interface ProfileData {
  customerId: number;
  customerName: string;
  newCustomerImgUrl: string;
  preCustomerImgUrl: string;
  birthDate: string;
  gender: string;
  phone: string;
  nickname: string;
  address1: string;
  address2: string;
  detailAddress: string;
}
const updateProfile = async (profileData: ProfileData) => {
  return await APIClient.patch('/daengggu/customer/profile/update', profileData);
};
export default updateProfile;
