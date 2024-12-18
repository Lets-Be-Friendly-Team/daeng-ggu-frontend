import { APIClient } from '@daeng-ggu/shared';

const postCancelReservation = async (reservationId: string) => {
  return await APIClient.post(`/daengggu/reservation/${reservationId}/cancel`);
};

export default postCancelReservation;
