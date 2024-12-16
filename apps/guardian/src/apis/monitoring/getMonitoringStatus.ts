import { APIClient } from '@daeng-ggu/shared';

import { SecondDefaultResponse } from '@/types/api';
import { ReservationStatusType } from '@/types/reservation';

const getMonitoringStatus = async (reservationId: string): Promise<SecondDefaultResponse<ReservationStatusType>> => {
  return await APIClient.get(`/daengggu/process/${reservationId}/status`);
};

export default getMonitoringStatus;
