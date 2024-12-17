import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface StepData {
  step: number;
  title: string;
  contents: ReactNode;
}

export interface serviceBreed {
  majorBreedCode: string;
  price: string;
  time: string;
}
export interface Service {
  serviceCode: string;
  breedPriceTimeList: serviceBreed[];
}

export interface Breed {
  breedCode: string;
  // codeDesc: string;
}

export interface Portfolio {
  portfolioId?: number;
  title: string;
  video?: File | null;
  imgList?: File[];
  contents: string;
  newVideoUrl: string;
  newImgUrlList: string[];
}

// export interface Review {
//   reviewId: number;
//   reviewImg: File;
// }

export interface DesignerData {
  designerId: number;
  // designerImg: File | null;
  newImgUrl: string;
  nickname: string;
  address1?: string;
  address2?: string;
  detailAddress: string;
  introduction: string;
  phone: string;
  providedServiceList: Service[];
  // possibleBreeds: Breed[];
  dayOff: string[];
  businessNumber: string;
  businessIsVerified: string;
  certificationsUrlList: string[];
  workExperience: string;
  portfolioList: Portfolio[];
}

export interface StepProps {
  formData: DesignerData;
  setFormData: Dispatch<SetStateAction<DesignerData>>;
}

export const breedList: Record<string, { code: string }> = {
  소형견: { code: 'P1' },
  중형견: { code: 'P2' },
  대형견: { code: 'P3' },
  특수견: { code: 'P4' },
};
export const reverseBreedList = new Map(Object.entries(breedList).map(([key, value]) => [value.code, key]));

export const serviceList: Record<string, string> = {
  S101: '목욕',
  S102: '전체미용',
  S103: '부분미용',
  S104: '위생미용',
  S2: '스파',
  S3: '풀케어',
  S4: '스트리밍',
};

export interface FileData {
  designerImg: File | null;
  certifications: File[];
  portfolioImgList: File[];
  video: File | null;
}
