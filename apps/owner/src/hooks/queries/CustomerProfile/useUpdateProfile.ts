import { useMutation } from '@tanstack/react-query';

import updateProfile, { ProfileData } from '@/apis/profile/updateProfile';

const useUpdateProfile = () => {
  return useMutation({
    mutationFn: (profileData: ProfileData) => updateProfile(profileData),
  });
};
export default useUpdateProfile;
