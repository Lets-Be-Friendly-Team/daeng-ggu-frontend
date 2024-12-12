import { APIClient } from '@daeng-ggu/shared';

import { IReservation } from '@/pages/ReservationPage/components/ReservationHistory';

export interface ReservationResponse {
  status: string;
  message: string;
  data: IReservation[];
}
const getReservations = async ({ customerId }: { customerId: number }) => {
  const response = await APIClient.get<ReservationResponse>('/daengggu/reservations', {
    customerId: customerId.toString(),
  });
  return response;
};
export default getReservations;
