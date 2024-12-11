// src/apis/request/getCompletedRequests.ts

import { APIClient } from '@daeng-ggu/shared';

import { DefaultResponse } from '@/types/api.ts';

// Interface for individual completed request
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

const getCompletedRequests = async (): Promise<CompletedRequest[]> => {
  const response = await APIClient.get<DefaultResponse<CompletedRequest>>('/daengggu/bid/request/customer');
  console.log('Fetched Completed Requests:', response);
  return response.data;
};

export default getCompletedRequests;
