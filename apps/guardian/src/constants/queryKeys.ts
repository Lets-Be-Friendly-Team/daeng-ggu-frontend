export const GUADIAN_MONITORING_QUERY_KEYS = {
  GET_RESERVATION_LIST: ['getReservationList'],
  GET_MONITORING_STATUS: (reservationId: string) => ['getMonitoringStatus', reservationId],
  GET_RESERVATION_INFO: (reservationId: string) => ['getReservationInfo', reservationId],
  GET_BRADCAST_CHANNEL: (reservationId: string) => ['getBroadcastChannel', reservationId],
};
