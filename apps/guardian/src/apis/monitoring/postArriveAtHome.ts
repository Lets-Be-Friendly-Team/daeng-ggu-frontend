import { APIClient } from '@daeng-ggu/shared';

const postArriveAtHome = async (reservationId: string) => {
  return await APIClient.post(`/daengggu/guardian/process/${reservationId}/arrive-at-home`);
};

export default postArriveAtHome;
