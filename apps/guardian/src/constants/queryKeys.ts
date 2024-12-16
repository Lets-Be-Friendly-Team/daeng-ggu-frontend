export const GUADIAN_MONITORING_QUERY_KEYS = {
  GET_RESERVATION_LIST: ['getReservationList'],
  GET_MONITORING_STATUS: (reservationId: string) => ['getMonitoringStatus', reservationId],
};
