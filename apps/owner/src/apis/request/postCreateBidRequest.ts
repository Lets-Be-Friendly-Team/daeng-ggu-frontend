// src/apis/bidRequest.ts

import { APIClient } from '@daeng-ggu/shared';

// Define the shape of your request data
export interface BidRequestData {
  petId: number;
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

// Define the response type
export interface BidRequestResponse {
  data?: string;
  success: boolean;
  message: string;
}

export const postCreateBidRequest = async (data: BidRequestData): Promise<BidRequestResponse> => {
  const request = await APIClient.put<BidRequestResponse>('/daengggu/bid/request', data);
  console.log(request);
  return request;
};
