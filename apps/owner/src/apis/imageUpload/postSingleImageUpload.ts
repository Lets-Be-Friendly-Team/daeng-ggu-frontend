import { APIClient } from '@daeng-ggu/shared/src/apis/APIClient';

export interface UploadImageResponse {
  status: string;
  data: string;
  message: string;
}

const postSingleImageUpload = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('img', file);

  try {
    const response = await APIClient.post<UploadImageResponse>('/daengggu/image', formData, {
      accept: '*/*', // Custom 헤더
    });

    if (response.status !== 'SUCCESS') {
      throw new Error(`Upload failed: ${response.message}`);
    }

    return response.data; // 이미지 주소 리턴
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'An unknown error occurred during upload');
    }
    throw new Error('An unknown error occurred during upload');
  }
};

export default postSingleImageUpload;
