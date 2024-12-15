const ROUTES = {
  main: '',
  progress: (reservationId?: number) => `progress/${reservationId || ':reservartionId'}`,
  bid: 'bid',
  test: 'test',
} as const;

export default ROUTES;
