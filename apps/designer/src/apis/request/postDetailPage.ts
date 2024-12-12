import { APIClient } from '@daeng-ggu/shared';

import { SecondDefaultResponse } from '@/types/api';

// request
export interface BidRequest {
  requestId: number;
}

export interface BidRequestResponse {
  petId: number;
  petName: string;
  petImageUrl: string;
  petImageName: string;
  birthDate: string;
  gender: string;
  isNeutered: string;
  weight: number;
  majorBreedCode: string;
  majorBreed: string;
  subBreedCode: string;
  subBreed: string;
  specialNotes?: string;
  isRequested: boolean;
  customerId: number;
  customerName: string;
  phone: string;
  address: string;
  desiredServiceCode?: string;
  lastGroomingDate?: string;
  desiredDate1?: string;
  desiredDate2?: string;
  desiredDate3?: string;
  desiredRegion?: string;
  isVisitRequired?: boolean;
  isMonitoringIncluded?: boolean;
  additionalRequest?: string;
  deliveryFee?: number;
  monitoringFee?: number;
}

export interface IPostDetailPage {
  (_data: BidRequest): Promise<BidRequestResponse>;
}

export const postDetailPage: IPostDetailPage = async (_data) => {
  const response = await APIClient.post<SecondDefaultResponse<BidRequestResponse>>('/daengggu/bid/request', _data);
  console.log('Full response:', response.data);

  return response.data;
};
