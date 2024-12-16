import { APIClient } from '@daeng-ggu/shared';

import { DefaultResponse } from '@/types/api';
import { ReservationType } from '@/types/reservation';

const getReservationList = async (): Promise<DefaultResponse<ReservationType>> => {
  return await APIClient.get('/daengggu/guardian/reservations');
};

export default getReservationList;
