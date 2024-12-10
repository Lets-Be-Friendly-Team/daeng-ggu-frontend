import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface StepData {
  step: number;
  title: string;
  contents: ReactNode;
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
  video: File;
  imgList: File[];
  contents: string;
}

export interface Review {
  reviewId: number;
  reviewImg: File;
}

export interface DesignerData {
  designerImg: File | null;
  nickname: string;
  address1?: string;
  address2?: string;
  detailAddress: string;
  introduction: string;
  phone: string;
  providedServices: Service[];
  possibleBreeds: Breed[];
  dayOff: string[]; //휴무일 -> 인터페이스 정의서에 없어서 임의로 명명함
  //가격 및 소요시간 추가
  businessNumber: string;
  certifications: string[];
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
