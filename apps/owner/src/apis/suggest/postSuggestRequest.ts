import { SecondDefaultResponse } from '@daeng-ggu/designer/src/types/api.ts';
import { APIClient } from '@daeng-ggu/shared';

// request
export interface estimateRequest {
  estimateId: number;
}

export interface PostSuggestResponse {
  estimateId: number;
  designerId: number;
  designerName: string;
  designerImageUrl: string;
  createdAt: string;
  estimateDetail: string;
  customerId: number;
  customerName: string;
  phone: string;
  address?: string;
  designerAddress?: string;
  groomingFee: number;
  deliveryFee: number;
  monitoringFee: number;
  estimatePrice: number;
  estimateImgList: string[]; // <-- Changed from EstimateImg[] to string[]
  serviceDescription?: string;
}

export interface PostSuggestProp {
  (_data: estimateRequest): Promise<PostSuggestResponse>;
}

export const postSuggestRequest: PostSuggestProp = async (_data) => {
  const response = await APIClient.post<SecondDefaultResponse<PostSuggestResponse>>('/daengggu/bid/estimate', _data);
  console.log('Full suggest response:', response);
  return response.data;
};
