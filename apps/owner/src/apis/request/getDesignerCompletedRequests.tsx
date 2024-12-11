// src/apis/request/getDesignerCompletedRequests.ts
import { APIClient } from '@daeng-ggu/shared';

export interface DesignerCompletedRequest {
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

export interface GetDesignerCompletedResponse {
  requestList: DesignerCompletedRequest[];
}

const getDesignerCompletedRequests = async (): Promise<GetDesignerCompletedResponse> => {
  return await APIClient.get<GetDesignerCompletedResponse>('/daengggu/bid/estimate/designer');
};

export default getDesignerCompletedRequests;
