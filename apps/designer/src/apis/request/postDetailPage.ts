// src/apis/bidRequest.ts

import { APIClient } from '@daeng-ggu/shared';

// request
export interface BidRequest {
  customerId: number;
}

// response data
export interface BidRequestResponse {
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

export const postDetailPage = async (data: BidRequest): Promise<BidRequestResponse> => {
  return await APIClient.post<BidRequestResponse>('/daengggu/bid/request', data);
};
