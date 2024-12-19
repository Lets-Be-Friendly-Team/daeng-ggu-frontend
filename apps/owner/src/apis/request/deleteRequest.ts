import { APIClient } from '@daeng-ggu/shared';

const deleteRequest = async (request_id: number) => {
  return await APIClient.delete('/daengggu/bid/request', { request_id: request_id.toString() });
};

export default deleteRequest;
