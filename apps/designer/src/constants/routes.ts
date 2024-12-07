const ROUTES = {
  main: '/',
  progress: '/progress',
  bid: '/bid',
  profile: '/profile',
  profileEdit: '/profile/edit',
  profileEditPortfolio: '/profile/edit/portfolio',
  reviewDetail: '/profile/review/:reviewId',
} as const;

export default ROUTES;
