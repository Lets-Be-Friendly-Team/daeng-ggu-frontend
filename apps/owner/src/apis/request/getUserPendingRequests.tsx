// src/apis/request/getUserPendingRequests.ts
import { APIClient } from '@daeng-ggu/shared';

export interface UserPendingRequest {
  petId: number;
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

export interface GetUserPendingResponse {
  data: UserPendingRequest[];
}

const getUserPendingRequests = async (): Promise<GetUserPendingResponse> => {
  const response = await APIClient.get<GetUserPendingResponse>('/daengggu/bid/estimate/customer');
  console.log(response.data);
  return response;
};

export default getUserPendingRequests;
