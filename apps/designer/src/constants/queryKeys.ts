export const GUADIAN_MONITORING_QUERY_KEYS = {
  GET_MONITORING_STATUS: (reservationId: string) => ['getMonitoringStatus', reservationId],
  GET_RESERVATION_LIST: ['getReservationList'],
  POST_CREATE_CHANNEL: (reservationId?: string) => ['postCreateChannel', reservationId],
  GET_RESERVATION_OWNER_INFO: (reservationId?: string) => ['getReservationOwnerInfo', reservationId],
  GET_BROADCAST_CHANNEL: (reservationId?: string) => ['getBroadcastChannel', reservationId],
};

export const DESIGNER_QUERY_KEYS = {
  GET_PROFILE: (designerId: number) => ['getProfile', designerId],
  GET_PORTFOLIO_DETAIL: (designerId: number, portfolioId: number) => ['getPortfolioDetail', designerId, portfolioId],
  GET_PROFILE_DETAIL: (designerId: number) => ['getProfileDetail', designerId],
};
export const RESERVATION_QUERY_KEYS = {
  GET_RESERVATION: ['getReservation'],
} as const;

export const USER_QUERY_KEYS = {
  GET_USER: ['getUser'],
  // GET_USER_LIST: ['getUserList'],
  POST_USER: ['postUser'],
  //   DELETE_USER: ['delete]
} as const;

export const BUSINESS_QUERY_KEYS = {
  GET_VERIFY_BUSINESS: (businessNumber: string, representativeName: string, startDate: string) => [
    'verifyBusiness',
    businessNumber,
    representativeName,
    startDate,
  ],
} as const;
