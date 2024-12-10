import { useQuery } from '@tanstack/react-query';

import getPetProfileDetail from '@/apis/petProfile/getPetProfileDetail';
import { PET_QUERY_KEYS } from '@/constants/queryKeys';

const useGetPetProfileDetail = (customerId: number, petId: number) => {
  return useQuery({
    queryKey: PET_QUERY_KEYS.GET_PET_PROFILE_DETAIL(customerId, petId),
    queryFn: () => getPetProfileDetail({ customerId, petId }),
    select: (data) => data.data,
  });
};

export default useGetPetProfileDetail;
