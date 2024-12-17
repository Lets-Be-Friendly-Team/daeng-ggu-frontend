import { APIClient } from '@daeng-ggu/shared/src/apis/APIClient';

export interface UploadMultipleImagesResponse {
  status: string;
  data: string[]; // Array of URLs for the uploaded images
  message: string;
}

const postMultipleImageUpload = async (imgList: File[]): Promise<string[]> => {
  const formData = new FormData();
  imgList.forEach((file) => formData.append('imgList', file));

  try {
    const response = await APIClient.post<UploadMultipleImagesResponse>('/daengggu/images', formData, {
      accept: '*/*',
    });

    if (response.status !== 'SUCCESS') {
      throw new Error(`Upload failed: ${response.message}`);
    }

    return response.data; // Array of image URLs
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'An unknown error occurred during upload');
    }
    throw new Error('An unknown error occurred during upload');
  }
};

export default postMultipleImageUpload;
