import { APIClient } from '@daeng-ggu/shared';

const postArriveAtShop = (reservationId: string) => {
  return APIClient.post(`daengggu/guardian/process/${reservationId}/arrive-at-shop`);
};

export default postArriveAtShop;
