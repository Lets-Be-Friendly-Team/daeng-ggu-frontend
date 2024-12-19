import { useMutation } from '@tanstack/react-query';

import deleteProfile from '@/apis/Profile/deleteProfile';

const useDeleteProfile = () => {
  return useMutation({
    mutationFn: ({ designerId }: { designerId: number }) => deleteProfile({ designerId }),
    onSuccess: (data) => {
      console.log('Profile deleted successfully:', data);
    },
    onError: (error) => {
      console.error('Failed to delete profile:', error);
    },
  });
};
export default useDeleteProfile;
