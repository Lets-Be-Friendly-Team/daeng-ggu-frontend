import { useMutation } from '@tanstack/react-query';

import updateProfile from '@/apis/profile/updateProfile';
const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateProfile,
  });
};
export default useUpdateProfile;
