import { APIClient } from '@daeng-ggu/shared';

const postCreateReservationProcess = async (reservationId: number) => {
  return await APIClient.post(`/daengggu/guardian/reservation/${reservationId}/process`);
};

export default postCreateReservationProcess;
