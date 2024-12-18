import { APIClient } from '@daeng-ggu/shared';

import { SecondDefaultResponse } from '@/types/api';
import { ReservationInfo } from '@/types/reservation';

const getReservationInfo = async (reservationId: string): Promise<SecondDefaultResponse<ReservationInfo>> => {
  return await APIClient.get(`/daengggu/guardian/reservation/${reservationId}`);
};

export default getReservationInfo;
