import { APIClient } from '@daeng-ggu/shared';

const getReservationInfo = async (reservationId: string) => {
  return await APIClient.get(`/daengggu/guardian/reservation/${reservationId}`);
};

export default getReservationInfo;
