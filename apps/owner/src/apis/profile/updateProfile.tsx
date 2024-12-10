import { APIClient } from '@daeng-ggu/shared';

export interface UpdatedProfileData {
  customerId: number;
  customerName: string;
  newCustomerImgFile: File | string;
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
  const formData = new FormData();
  formData.append('customerId', String(profileData.customerId));
  formData.append('customerName', profileData.customerName);
  formData.append('preCustomerImgUrl', profileData.preCustomerImgUrl);
  formData.append('birthDate', profileData.birthDate);
  formData.append('gender', profileData.gender);
  formData.append('phone', profileData.phone);
  formData.append('nickname', profileData.nickname);
  formData.append('address1', profileData.address1);
  formData.append('address2', profileData.address2);
  formData.append('detailAddress', profileData.detailAddress);

  // File 타입일 경우에만 파일 append
  if (profileData.newCustomerImgFile && profileData.newCustomerImgFile instanceof File) {
    formData.append('newCustomerImgFile', profileData.newCustomerImgFile);
  } else {
    formData.append('newCustomerImgFile', '');
  }
  return await APIClient.post(url, formData);
};
export default updateProfile;
