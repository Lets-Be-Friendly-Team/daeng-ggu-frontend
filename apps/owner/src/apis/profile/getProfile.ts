import { APIClient } from '@daeng-ggu/shared';

export interface Pet {
  petId: number;
  petName: string;
  petImgUrl: string;
}

export interface Review {
  reviewId: number;
  reviewImgUrl1?: string;
  reviewImgUrl2?: string;
  reviewImgUrl3?: string;
  designerId: number;
  designerImgUrl: string;
  designerAddress: string;
  nickname: string;
  reviewContents: string;
  reviewStar: number;
  reviewLikeCnt: number;
  feedExposure: boolean;
}
export interface PossibleBreed {
  breedCode: string;
  codeDesc: string;
}
export interface Bookmark {
  designerId: number;
  nickname: string;
  designerImgUrl: string;
  designerAddress: string;
  possibleBreeds: PossibleBreed[];
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
  return await APIClient.get('/daengggu/customer/profile', { customerId: customerId.toString() });
};

export default getProfile;
