import { APIClient } from '@daeng-ggu/shared';

// 서비스 코드 및 설명
export interface Service {
  servicesCode: string;
  codeDesc: string;
}

// 품종 코드 및 설명
export interface Breed {
  breedCode: string;
  codeDesc: string;
}

// 포트폴리오 아이템
export interface PortfolioItem {
  portfolioId: number;
  title: string;
  videoUrl: string;
  imgUrlList: string[];
  contents: string;
}

// 디자이너 데이터 인터페이스
export interface DesignerData {
  designerId: number;
  designerName: string;
  nickname: string;
  designerImgUrl: string;
  designerImgName: string;
  address1: string;
  address2: string;
  detailAddress: string;
  introduction: string;
  phone: string;
  providedServices: Service[];
  possibleBreeds: Breed[];
  email: string;
  businessNumber: string;
  certifications: string[];
  workExperience: string;
  portfolioList: PortfolioItem[];
}

export interface PreProfileDataResponse {
  status: string;
  message: string;
  data: DesignerData;
}
const getProfileDetail = async ({ designerId }: { designerId: number }): Promise<PreProfileDataResponse> => {
  return await APIClient.get('/daengggu/designer/profile/detail', { designerId: designerId.toString() });
};
export default getProfileDetail;
