import { APIClient } from '@daeng-ggu/shared';

import { SecondDefaultResponse } from '@/types/api';
import { OwnerInfoType } from '@/types/reservation';

const getReservationOwnerInfo = async (reservationId: string): Promise<SecondDefaultResponse<OwnerInfoType>> => {
  return await APIClient.get(`daengggu/designer/process/${reservationId}/info`);
};

export default getReservationOwnerInfo;
