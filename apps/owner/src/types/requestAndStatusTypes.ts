// src/requestAndStatusTypes.ts

export type PageMode = 'user' | 'designer' | 'reservation';

export interface ProfileData {
  petId: number;
  petName: string;
  petImageUrl: string;
  petImgName: string;
  birthDate: string;
  gender: string;
  isNeutered: boolean;
  weight: number;
  majorBreedCode: string;
  majorBreed: string;
  subBreedCode: string;
  subBreed: string;
  specialNotes?: string;
  isRequested: boolean;
  customerName: string;
  phone: string;
  address: string;
  desiredServiceCode?: string;
}
export interface DesignerRequest {
  requestId: number;
  petId: number;
  petName: string;
  petImageUrl: string;
  desiredServiceCode: string;
  isVisitRequired: boolean;
  majorBreedCode: string;
  createdAt: string;
}
export interface ReservationRequest {
  _placeholder?: never;
}

export interface StepData {
  step: number;
  title: string;
  options: string[];
}

export interface UserProcessedData {
  selectedPet: number;
  selectedOptions: { [key: number]: string };
  profileData: ProfileData[];
  userInput: string;
  mode: 'detail';
}

export interface DesignerProcessedData {
  selectedPet: number;
  selectedOptions: { [key: number]: string };
  profileData: ProfileData[]; // Using ProfileData directly
  userInput: string;
  mode: 'detail';
}

export interface ReservationProcessedData {
  selectedPet: number;
  selectedOptions: { [key: number]: string };
  profileData: ProfileData[]; // Using ProfileData directly
  userInput: string;
  mode: 'detail';
}

export interface RequestReviewProps {
  selectedPet: number | null;
  selectedOptions: { [key: number]: string };
  profileData: ProfileData[]; // Using ProfileData directly
  stepData?: StepData[];
  onOptionChange?: (_step: number, _newOption: string) => void;
  onEnableDynamicHeight?: () => void;
  onDisableDynamicHeight?: () => void;
  userInput: string;
  mode?: 'detail' | 'default';
  pageMode?: PageMode;
}

interface DesignerProfileData extends ProfileData {
  desiredServiceCode: string;
}

export const isDesignerProfileData = (profile: ProfileData): profile is DesignerProfileData => {
  return typeof profile.desiredServiceCode === 'string';
};

export interface Estimate {
  estimateId: number;
  designerId: number;
  designerName: string;
  designerImageUrl: string;
  estimatePrice: number;
  petId: number;
  petName: string;
  createdAt: string;
}

export interface PendingPet {
  petId: number;
  requestId: number;
  petName: string;
  petImageUrl: string;
  desiredServiceCode?: string;
  isVisitRequired: boolean;
  lastGroomingDate?: string;
  desiredDate1?: string;
  desiredDate2?: string;
  desiredDate3?: string;
  desiredRegion?: string;
  isMonitoringIncluded: boolean;
  additionalRequest: string;
  createdAt: string;
  majorBreedCode: string;
  estimateList: Estimate[];
  customerName: string;
  phone: string;
  address: string;
  subBreed: string;
  birthDate: string;
  gender: string;
  isNeutered: boolean;
  weight: number;
  majorBreed: string;
  specialNotes: string;
}

export interface PendingRequestProps {
  data?: PendingPet[];
}

export interface CompletedRequest {
  requestId: number;
  petId: number;
  petName: string;
  petImageUrl: string;
  desiredServiceCode: string;
  isVisitRequired: boolean;
  createdAt: string;
  codeName: string;
  majorBreedCode: string;
}

export interface CompletedData {
  requestList: CompletedRequest[];
}

export interface DesignerCompletedRequest {
  petId: number;
  petName: string;
  petImageUrl: string;
  desiredServiceCode: string;
  lastGroomingDate: string;
  desiredDate1: string;
  desiredDate2: string;
  desiredDate3: string;
  desiredRegion: string;
  isVisitRequired: boolean;
  isMonitoringIncluded: boolean;
  additionalRequest: string;
}

export interface DesignerCompletedData {
  requestList: DesignerCompletedRequest[];
}
