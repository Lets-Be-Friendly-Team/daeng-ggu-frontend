import { APIClient } from '@daeng-ggu/shared';

import { PetFormData } from '@/pages/AddPetProfilePage/AddPetProfilePage';

// 반려견 정보 등록
export interface RegisterPetResponse {
  status: string;
  message: string;
  data: { petId: number };
}

const registerPetProfile = async (petFormData: PetFormData): Promise<RegisterPetResponse> => {
  return await APIClient.post('/daengggu/pet/profile/update', petFormData);
};
export default registerPetProfile;
