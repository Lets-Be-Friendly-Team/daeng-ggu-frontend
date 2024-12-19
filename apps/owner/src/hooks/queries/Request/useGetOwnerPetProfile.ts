import { useQuery } from '@tanstack/react-query';

import getOwnerPetProfile, { GetOwnerPetProfileResponse } from '@/apis/request/getOwnerPetProfile';

export const OWNER_PET_PROFILE_QUERY_KEY = ['ownerPetProfile'];

const useGetOwnerPetProfile = () => {
  return useQuery<GetOwnerPetProfileResponse[]>({
    queryKey: OWNER_PET_PROFILE_QUERY_KEY,
    queryFn: async () => await getOwnerPetProfile(),
  });
};

export default useGetOwnerPetProfile;
