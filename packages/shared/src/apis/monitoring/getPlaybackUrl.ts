import { APIClient } from '../APIClient';

interface PlaybackUrlResponse {
  playbackUrl: string;
}

const getPlaybackUrl = async (reservationId: string): Promise<PlaybackUrlResponse> => {
  return await APIClient.get(`/api/ivs/playback-url`, { reservationId });
};

export default getPlaybackUrl;
