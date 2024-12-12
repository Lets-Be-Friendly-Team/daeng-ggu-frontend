import { APIClient } from '@daeng-ggu/shared';

export interface providedService {
  servicesCode: string;
  codeDesc: string;
}
export interface possibleBreed {
  breedCode: string;
  codeDesc: string;
}
export interface portfolioItem {
  portfolioId: number;
  title: string;
  videoUrl: string;
  imgUrlList: string[];
  contents: string;
}
export interface reviewItem {
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
export interface DesignerProfileData {
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
  providedServices: providedService[];
  possibleBreeds: possibleBreed[];
  introduction: string;
  workExperience: string;
  certifications: string[];
  portfolioList: portfolioItem[];
  reviewList: reviewItem[];
}
export interface designerProfileResponse {
  status: string;
  message: string;
  data: DesignerProfileData;
}

const getDesignerProfile = async ({ designerId }: { designerId: number }): Promise<designerProfileResponse> => {
  return await APIClient.get('/daengggu/designer/profile', { designerId: designerId.toString() });
};
export default getDesignerProfile;
