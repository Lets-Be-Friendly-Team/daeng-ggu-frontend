import { APIClient } from '@daeng-ggu/shared';

const postEndStream = async (reservationId: string) => {
  return await APIClient.post(`/daengggu/designer/process/${reservationId}/end`);
};

export default postEndStream;
