import { APIClient } from '@daeng-ggu/shared';

export interface Pet {
  petId: number;
  petName: string;
  petImgUrl: string;
}

export interface Review {
  reviewId: number;
  reviewImgUrl: string;
}

export interface Bookmark {
  designerId: number;
  designerImgUrl: string;
  designerAddress: string;
  possibleBreed: string[];
}

export interface ProfileData {
  customerId: number;
  customerName: string;
  customerImgUrl: string;
  customerImgName: string;
  nickname: string;
  petList: Pet[];
  reviewList: Review[];
  bookmarkList: Bookmark[];
}

export interface ProfileResponse {
  status: string;
  message: string;
  data: ProfileData;
}

const getProfile = async ({ customerId }: { customerId: number }): Promise<ProfileResponse> => {
  const url = '/daengggu/customer/profile';
  return await APIClient.get(url, { customerId: customerId.toString() });
};

export default getProfile;
