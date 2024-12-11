const ROUTES = {
  // main: '',
  // progress: 'progress',
  // bid: 'bid',
  signup: 'signup',
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
  signupSuccess: 'success',
  membership: 'membership',
  registerProfile: 'register/profile',
  portfolio: 'portfolio',
  portfolioAdd: 'add',
} as const;

export default ROUTES;
