import { APISocket } from '@daeng-ggu/shared';

type UserType = 'GUARDIAN' | 'CUSTOMER';

const guardianlocationWebSocket = (reservationId: string, userType: UserType) => {
  return APISocket('/daengggu/websocket', { reservationId, userType });
};

export default guardianlocationWebSocket;
