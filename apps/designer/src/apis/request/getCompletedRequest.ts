// src/apis/request/getPendingRequests.ts

import { APIClient } from '@daeng-ggu/shared';

import { DefaultResponse } from '@/types/api.ts';

export interface DesignerCompletedRequest {
  petId: number;
  petName: string;
  petImageUrl: string;
  desiredServiceCode: string;
  lastGroomingDate: string;
  desiredDate1: string;
  desiredDate2?: string;
  desiredDate3?: string;
  desiredRegion: string;
  isVisitRequired: boolean;
  isMonitoringIncluded: boolean;
  additionalRequest: string;
}
const getCompletedRequests = async (): Promise<DesignerCompletedRequest[]> => {
  const response = await APIClient.get<DefaultResponse<DesignerCompletedRequest>>('/daengggu/bid/request/designer');
  console.log('Fetched completed Requests:', response.data);
  return response.data;
};

export default getCompletedRequests;
