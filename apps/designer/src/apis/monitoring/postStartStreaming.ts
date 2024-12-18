import { APIClient } from '@daeng-ggu/shared';

const postStartStreaming = async (reservationId: string) => {
  return await APIClient.post(`/daengggu/designer/process/${reservationId}`);
};

export default postStartStreaming;
