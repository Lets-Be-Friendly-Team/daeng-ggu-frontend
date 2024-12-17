import { APIClient } from '@daeng-ggu/shared';

import { IReservation } from '@/pages/ReservationPage/components/ReservationHistory';

export interface ReservationResponse {
  status: string;
  message: string;
  data: IReservation[];
}
const getReservations = async () => {
  const response = await APIClient.get<ReservationResponse>('/daengggu/customer/reservations');
  return response;
};
export default getReservations;
