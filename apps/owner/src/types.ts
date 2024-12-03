// src/types.ts
export type Mode = 'user' | 'designer' | 'reservation';

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
  petName: string;
  petImgUrl: string;
  desiredService?: string;
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

export interface DesignerRequest {
  requestId: number;
  petId: number;
  petName: string;
  petImageUrl: string;
  desiredServiceCode: string;
  isVisitRequired: boolean;
  createdAt: string;
}

export interface ReservationRequest {
  _placeholder?: never;
}

export interface CompletedData {
  requestList: Request[];
}

export interface Request {
  requestId: number;
  petId: number;
  petName: string;
  petImgUrl: string;
  desiredService: string;
  isVisitRequired: boolean;
  createdAt: string;
  codeName: string;
  majorBreedCode: string;
}

export interface DesignerCompletedData {
  requestList: DesignerCompletedRequest[];
}

export interface DesignerCompletedRequest {
  petId: number;
  petName: string;
  petImgUrl: string;
  desiredService: string;
  lastGroomingDate: string;
  desiredDate1: string;
  desiredDate2: string;
  desiredDate3: string;
  desiredRegion: string;
  isVisitRequired: boolean;
  isMonitoringIncluded: boolean;
  additionalRequest: string;
}

export interface CompletedRequestProps {
  data: CompletedData | DesignerCompletedData;
  mode: Mode;
}
