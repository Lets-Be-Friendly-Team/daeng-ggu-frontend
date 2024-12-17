import { APIClient } from '@daeng-ggu/shared';

export interface ProfileData {
  designerId: number;
  designerName: string;
  nickname: string;
  designerImgUrl: string;
  designerImgName: string;
  reviewStarAvg: number;
  reviewLikeCntAll: number;
  address1: string;
  address2: string;
  detailAddress: string;
  providedServices: Service[];
  possibleBreeds: Breed[];
  introduction: string;
  workExperience: string;
  certifications: string[];
  portfolioList: Portfolio[];
  reviewList: Review[];
}

export interface Service {
  servicesCode: string;
  codeDesc: string;
}

export interface Breed {
  breedCode: string;
  codeDesc: string;
}

export interface Portfolio {
  portfolioId: number;
  title: string;
  videoUrl: string;
  imgUrlList: string[];
  contents: string;
}

export interface Review {
  reviewId: number;
  reviewImgUrl1: string | null | undefined;
  reviewImgUrl2: string | null | undefined;
  reviewImgUrl3: string | null | undefined;
  customerId: number;
  customerImgUrl: string | undefined;
  customerName: string;
  reviewContents: string;
  reviewLikeCnt: number;
  reviewStar: number;
  isReviewLike: boolean;
  feedExposure: boolean;
}

export interface ProfileResponse {
  status: string;
  message: string;
  data: ProfileData;
}
const getProfile = async ({ designerId }: { designerId: number }): Promise<ProfileResponse> => {
  return await APIClient.get('/daengggu/designer/profile', { designerId: designerId.toString() });
};
export default getProfile;
