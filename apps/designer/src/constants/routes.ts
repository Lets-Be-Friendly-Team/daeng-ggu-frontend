const ROUTES = {
  main: '/',
  progress: '/progress',
  bid: '/bid',
  feed: '/feed',
  profile: '/profile',
  profileEdit: '/profile/edit',
  profileEditPortfolio: '/profile/edit/portfolio',
  portfolioDetail: '/profile/portfolio/:portfolioId',
  reviewDetail: '/profile/review/:reviewId',
  reservation: '/profile/reservation',
} as const;

export default ROUTES;
