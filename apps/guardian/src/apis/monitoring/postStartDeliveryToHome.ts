import { APIClient } from '@daeng-ggu/shared';

const postStartDeliveryToHome = async (reservationId: string) => {
  return await APIClient.post(`/daengggu/guardian/process/${reservationId}/start-delivery-to-home`);
};

export default postStartDeliveryToHome;
