import { APIClient } from '@daeng-ggu/shared';

import { PetFormData } from '@/pages/AddPetProfilePage/AddPetProfilePage';

// 반려견 정보 등록
export interface RegisterPetResponse {
  status: string;
  message: string;
  data: { petId: number };
}

const registerPetProfile = async (petFormData: PetFormData): Promise<RegisterPetResponse> => {
  const formData = new FormData();

  // petFormData의 각 필드를 FormData 객체에 추가
  Object.entries(petFormData).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // 배열 처리
      value.forEach((item) => formData.append(`${key}[]`, item));
    } else if (value instanceof File) {
      // 파일 처리
      formData.append(key, value);
    } else {
      formData.append(key, String(value));
    }
  });
  return await APIClient.post('/daenggu/pet/profile/update', petFormData);
};
export default registerPetProfile;
