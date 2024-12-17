import { APIClient } from '@daeng-ggu/shared';

const postStartStream = async (reservationId: string) => {
  return await APIClient.post(`/daengggu/designer/process/${reservationId}/start`);
};

export default postStartStream;
