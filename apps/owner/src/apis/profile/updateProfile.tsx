import { APIFetch } from '@daeng-ggu/shared';

export interface UpdatedProfileData {
  data: {
    customerId: number;
    customerName: string;
    customerImgUrl: string;
    preCustomerImgUrl: string;
    birthDate: string;
    gender: string;
    phone: string;
    nickname: string;
    address1: string;
    address2: string;
    detailAddress: string;
  };
  newCustomerImgFile: string;
}
export interface UpdatedProfileDataResponse {
  status: string;
  message: string;
  data: UpdatedProfileData;
}
// const updateProfile = async (formData: FormData) => {
//   const header = new Headers({
//     'Content-Type': 'multipart/form-data',
//   });
//   const api = new APIFetch(import.meta.env.VITE_BASE_URL, header);
//   return await api.post('/daengggu/customer/profile/update', {
//     body: formData,
//   });
// };
// export default updateProfile;
// const updateProfile = async ({ body, boundary }: { body: string; boundary: string }) => {
//   const headers = new Headers({
//     'Content-Type': `multipart/form-data; boundary=${boundary}`,
//   });
//   const api = new APIFetch(import.meta.env.VITE_BASE_URL, headers);
//   return await api.post('/daengggu/customer/img/test9', {
//     body,
//   });
// };
// export default updateProfile;
const updateProfile = async (formData: FormData) => {
  const header = new Headers({
    'Content-Type': 'multipart/form-data',
  });
  const api = new APIFetch(import.meta.env.VITE_BASE_URL, header);
  return await api.post('/daengggu/customer/img/test9', {
    body: formData,
  });
};
export default updateProfile;
