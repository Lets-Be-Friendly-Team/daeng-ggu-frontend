import { APIClient } from '@daeng-ggu/shared';

export interface ImageResponse {
  status: string;
  message: string;
  data: string;
}

const postImage = async (formData: FormData): Promise<ImageResponse> => {
  // const header = new Headers({
  //   'Content-Type': 'multipart/form-data',
  // });
  // const api = new APIFetch(import.meta.env.VITE_BASE_URL);
  // return await api.post('/daengggu/image', formData);
  return await APIClient.post('/daengggu/image', formData);
  // if (!response.ok) {
  //   throw new Error('Failed to upload image');
  // }

  // return await response.json();
};
export default postImage;
