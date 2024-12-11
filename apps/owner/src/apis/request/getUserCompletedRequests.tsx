// src/apis/request/getUserCompletedRequests.ts
import { APIClient } from '@daeng-ggu/shared';

export interface UserCompletedRequest {
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

export interface GetUserCompletedResponse {
  requestList: UserCompletedRequest[];
}

const getUserCompletedRequests = async (): Promise<GetUserCompletedResponse> => {
  return await APIClient.get<GetUserCompletedResponse>('/daengggu/bid/request/customer');
};

export default getUserCompletedRequests;
