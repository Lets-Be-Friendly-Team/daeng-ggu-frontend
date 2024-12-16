import { APIClient } from '@daeng-ggu/shared';

const postStartDeliveryToShop = async (reservationId: string) => {
  return await APIClient.post(`/daengggu/guardian/process/${reservationId}/start-delivery-to-shop`);
};

export default postStartDeliveryToShop;
