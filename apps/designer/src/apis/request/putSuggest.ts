// src/apis/request/putSuggest.ts

import { APIClient } from '@daeng-ggu/shared/src/apis/APIClient.ts'; // Adjust import path as needed

export interface EstimateRequestPayload {
  estimateRequest: {
    requestId: number;
    requestDetail: string;
    requestDate: string;
    requestPrice: number;
  };
  estimateImgList: Array<{ estimateImgUrl: string }>;
  estimateImgIdList: Array<{ estimateTagId: string }>;
}

export interface BidRequestResponse {
  data?: string;
  success: boolean;
  message: string;
}

export const putSuggest = async (payload: EstimateRequestPayload): Promise<BidRequestResponse> => {
  try {
    const response = await APIClient.put<BidRequestResponse>('/daengggu/bid/estimate', payload, {});

    console.log('Received response:', response);

    if (!response.success) {
      throw new Error(`Request failed: ${response.message}`);
    }

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'An unknown error occurred during the PUT request');
    }
    throw new Error('An unknown error occurred during the PUT request');
  }
};
