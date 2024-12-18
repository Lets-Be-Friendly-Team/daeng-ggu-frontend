import { useMutation } from '@tanstack/react-query';

import deletePetProfile from '@/apis/petProfile/deletePetProfile';

const useDeletePetProfile = () => {
  return useMutation({
    mutationFn: ({ customerId, petId }: { customerId: number; petId: number }) =>
      deletePetProfile({ customerId, petId }),
    onSuccess: (data) => {
      console.log('Pet profile deleted successfully:', data);
    },
    onError: (error) => {
      console.error('Failed to delete pet profile:', error);
    },
  });
};
export default useDeletePetProfile;
