const ROUTES = {
  main: '',
  progress: (reservationId?: number) => `progress/${reservationId || ':reservationId'}`,
  bid: 'bid',
  test: 'test',
} as const;

export default ROUTES;
