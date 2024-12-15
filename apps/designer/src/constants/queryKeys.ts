export const GUADIAN_MONITORING_QUERY_KEYS = {
  GET_MONITORING_STATUS: (reservationId: string) => ['getMonitoringStatus', reservationId],
};

export const DESIGNER_QUERY_KEYS = {
  GET_PROFILE: (designerId: number) => ['getProfile', designerId],
};
