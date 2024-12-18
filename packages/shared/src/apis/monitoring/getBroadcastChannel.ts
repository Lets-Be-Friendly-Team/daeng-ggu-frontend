import { APIClient } from '../APIClient';

interface ChannelInfoResponse {
  ingestUrl: string;
  streamKey: string;
}

const getBroadcastChannel = async (reservationId: string): Promise<ChannelInfoResponse> => {
  return await APIClient.get(`/api/ivs/channel-info`, { reservationId });
};

export default getBroadcastChannel;
