// src/apis/request/getPendingRequests.ts

import { APIClient } from '@daeng-ggu/shared';

import { DefaultResponse } from '@/types/api.ts';

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
const getPendingRequests = async (): Promise<DesignerRequest[]> => {
  const response = await APIClient.get<DefaultResponse<DesignerRequest>>('/daengggu/bid/request/designer');
  console.log('Fetched Pending Requests:', response);
  return response.data;
};

export default getPendingRequests;
