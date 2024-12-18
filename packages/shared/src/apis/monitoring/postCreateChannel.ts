import { APIClient } from '../APIClient';

// 추후 수정 필요 (any)
const postCreateChannel = async (reservationId: string) => {
  return await APIClient.post(`/api/ivs/create-channel`, {}, {}, { reservationId });
};

export default postCreateChannel;
