import { APIClient } from '@daeng-ggu/shared/src/apis/APIClient.ts'; // Adjust import path as needed

export interface EstimateRequestPayload {
  estimateRequest: {
    requestId: number;
    requestDetail: string;
    requestDate: string;
    requestPrice: number;
  };
  estimateImgList: Array<{ estimateImgUrl: File }>;
  estimateImgIdList: Array<{ estimateTagId: string }>;
}

export interface BidRequestResponse {
  data?: string;
  success: boolean;
  message: string;
}

export const putSuggest = async (payload: EstimateRequestPayload): Promise<BidRequestResponse> => {
  const formData = new FormData();

  formData.append('estimateRequest', new Blob([JSON.stringify(payload.estimateRequest)], { type: 'application/json' }));

  // Convert estimateImgList to JSON and escape characters
  const estimateImgListData = payload.estimateImgList.map((item) => ({ estimateImgUrl: item.estimateImgUrl.name }));
  const estimateImgListJsonString = JSON.stringify(estimateImgListData)
    .replace(/"/g, '\\"')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]');

  formData.append('estimateImgList', estimateImgListJsonString);

  // Convert estimateImgIdList to JSON and escape characters
  const estimateImgIdListJsonString = JSON.stringify(payload.estimateImgIdList)
    .replace(/"/g, '\\"')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]');

  formData.append('estimateImgIdList', estimateImgIdListJsonString);

  // Debugging: Convert formData to a loggable object without using 'any'
  type FormDataValue = string | { name: string; type: string; size: number };
  const formDataObject: Record<string, FormDataValue> = {};

  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      formDataObject[key] = {
        name: value.name,
        type: value.type,
        size: value.size,
      };
    } else {
      // value is a string in this case
      formDataObject[key] = value;
    }
  }

  console.log('FormData to be sent:', JSON.stringify(formDataObject, null, 2));

  const response = await APIClient.put<BidRequestResponse>('/daengggu/bid/estimate', formData);

  console.log('Received response:', response);

  if (!response.success) {
    throw new Error(`Request failed: ${response.message}`);
  }

  return response;
};
