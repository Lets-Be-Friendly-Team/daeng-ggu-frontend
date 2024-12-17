import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import registerProfile, { RegisterProfileResponse } from '@/apis/Profile/registerProfile';
import { DesignerData } from '@/pages/RegisterProfile/RegisterProfileData';

interface RegisterProfileError {
  message: string;
  status: number;
  code: number;
}

const useRegisterProfile = (
  mutationOptions?: UseMutationOptions<RegisterProfileResponse, RegisterProfileError, DesignerData>,
) => {
  return useMutation({
    mutationFn: async (profileData: DesignerData) => await registerProfile(profileData),
    ...mutationOptions,
  });
};

export default useRegisterProfile;
