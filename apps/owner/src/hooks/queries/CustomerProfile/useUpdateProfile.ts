import { useMutation } from '@tanstack/react-query';

import updateProfile from '@/apis/profile/updateProfile';
const useUpdateProfile = () => {
  return useMutation({
    mutationFn: (formData: FormData) => updateProfile(formData),
  });
};
export default useUpdateProfile;
