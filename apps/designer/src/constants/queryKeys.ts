export const GUADIAN_MONITORING_QUERY_KEYS = {
  GET_MONITORING_STATUS: (reservationId: string) => ['getMonitoringStatus', reservationId],
};

export const DESIGNER_QUERY_KEYS = {
  GET_PROFILE: (designerId: number) => ['getProfile', designerId],
  GET_PORTFOLIO_DETAIL: (designerId: number, portfolioId: number) => ['getPortfolioDetail', designerId, portfolioId],
};
