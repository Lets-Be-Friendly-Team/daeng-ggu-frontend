import { APIClient } from '@daeng-ggu/shared';

export interface UpdatedProfileData {
  customerId: number;
  customerName: string;
  newCustomerImgFile: string;
  preCustomerImgUrl: string;
  birthDate: string;
  gender: string;
  phone: string;
  nickname: string;
  address1: string;
  address2: string;
  detailAddress: string;
}
export interface UpdatedProfileDataResponse {
  status: string;
  message: string;
}
const updateProfile = async (profileData: UpdatedProfileData) => {
  const url = '/daengggu/customer/profile/update';
  return await APIClient.post(url, {
    body: profileData,
    // headers: {
    //   'Content-Type': 'multipart/form-data',
    // },
  });
};
export default updateProfile;
