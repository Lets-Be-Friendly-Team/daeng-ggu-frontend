import { APIClient } from '@daeng-ggu/shared';

// 업데이트 요청 데이터 타입
export interface ProfileData {
  designerId: number;
  nickname: string;
  newImgUrl?: string;
  preImgUrl?: string;
  address1: string;
  address2: string;
  detailAddress: string;
  introduction: string;
  phone: string;
  providedServices: string[];
  possibleBreed: string[];
  preCertifications: string[];
  workExperience: string;
  newCertifications: string[];
}

const updateProfile = async (profileData: ProfileData) => {
  return await APIClient.patch('/daengggu/designer/profile/update', profileData);
};
export default updateProfile;
