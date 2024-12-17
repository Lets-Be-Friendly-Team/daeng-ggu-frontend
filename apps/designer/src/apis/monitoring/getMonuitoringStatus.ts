import { APIClient, ReservationStatusType } from '@daeng-ggu/shared';

import { SecondDefaultResponse } from '@/types/api';

const getMonuitoringStatus = async (reservationId: string): Promise<SecondDefaultResponse<ReservationStatusType>> => {
  return await APIClient.get(`/daengggu/process/${reservationId}/status`);
};

export default getMonuitoringStatus;
