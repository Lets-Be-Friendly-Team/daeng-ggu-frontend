const ROUTES = {
  main: '',
  progress: (reservationId?: number) => `progress/${reservationId || ':reservationId'}`,
  bid: 'bid',
} as const;

export default ROUTES;
