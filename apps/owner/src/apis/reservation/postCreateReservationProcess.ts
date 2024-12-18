import { APIClient } from '@daeng-ggu/shared';

const postCreateReservationProcess = async (reservationId: number) => {
  return await APIClient.post(`/daengggu/reservations/${reservationId}/processes/create`);
};

export default postCreateReservationProcess;
