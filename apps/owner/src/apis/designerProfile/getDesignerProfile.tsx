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
  reviewImgUrl1?: string;
  reviewImgUrl2?: string;
  reviewImgUrl3?: string;
  designerId: number;
  designerImgUrl: string | undefined;
  designerAddress: string;
  nickname: string;
  reviewContents: string;
  reviewLikeCnt: number;
  reviewStar: number;
  feedExposure: boolean;
}
export interface DesignerProfileData {
  isBookmarked: boolean;
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

const getDesignerProfile = async ({
  designerId,
  customerId,
}: {
  designerId: number;
  customerId: number;
}): Promise<designerProfileResponse> => {
  return await APIClient.get('/daengggu/customer/designer/profile', {
    designerId: designerId.toString(),
    customerId: customerId.toString(),
  });
};
export default getDesignerProfile;
