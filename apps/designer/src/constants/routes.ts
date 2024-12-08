const ROUTES = {
  main: '/',
  progress: '/progress',
  bid: '/bid',
  profile: '/profile',
  profileEdit: '/profile/edit',
  profileEditPortfolio: '/profile/edit/portfolio',
  reviewDetail: '/profile/review/:reviewId',
  reservation: '/profile/reservation',
} as const;

export default ROUTES;
