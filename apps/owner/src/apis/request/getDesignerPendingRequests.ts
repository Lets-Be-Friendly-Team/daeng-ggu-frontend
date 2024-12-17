// src/apis/request/getDesignerPendingRequests.ts
import { APIClient } from '@daeng-ggu/shared';

export interface DesignerPendingRequest {
  requestId: number;
  petId: number;
  petName: string;
  petImageUrl: string;
  desiredServiceCode: string;
  isVisitRequired: boolean;
  majorBreedCode: string;
  createdAt: string;
}
interface GetDesignerPendingResponse {
  requestList: DesignerPendingRequest[];
}

const getDesignerPendingRequests = async (): Promise<DesignerPendingRequest[]> => {
  const response = await APIClient.get<GetDesignerPendingResponse>('/daengggu/bid/request/designer');
  console.log('hi this is me', response);
  return response.requestList;
};

export default getDesignerPendingRequests;
