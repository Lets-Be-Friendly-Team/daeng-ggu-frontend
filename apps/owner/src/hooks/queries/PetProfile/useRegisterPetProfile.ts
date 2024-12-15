import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import registerPetProfile, { RegisterPetResponse } from '@/apis/petProfile/registerPetProfile';
import { PetFormData } from '@/pages/AddPetProfilePage/AddPetProfilePage';

interface RegisterPetError {
  message: string;
  status: number;
  code: number;
}

const useRegisterPetProfile = (
  mutationOptions?: UseMutationOptions<RegisterPetResponse, RegisterPetError, PetFormData>,
) => {
  return useMutation({
    mutationFn: async (petFormData: PetFormData) => await registerPetProfile(petFormData),
    ...mutationOptions,
  });
};
export default useRegisterPetProfile;
