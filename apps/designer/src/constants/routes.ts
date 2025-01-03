const ROUTES = {
  // main: '',
  // progress: 'progress',
  // bid: 'bid',
  main: '/',
  signup: 'signup',
  progress: (reservationId?: number) => `progress/${reservationId || ':reservationId'}`,
  loginCallback: 'callback',
  bid: 'bid',
  feed: 'feed',
  profile: 'profile',
  profileEdit: 'edit',
  profileEditPortfolio: 'edit/portfolio/:portfolioId',
  portfolioDetail: 'portfolio/:portfolioId',
  reviewDetail: 'review/:reviewId',
  reservation: 'reservation',
  signupSuccess: 'success',
  membership: 'membership',
  registerProfile: 'register/profile',
  // portfolio: 'portfolio',
  portfolioAdd: 'add/portfolio', // 마이페이지에서 등록하는 포트폴리오
  portfolioRegister: 'register/portfolio', // 회원가입 시 등록하는 포트폴리오
  bidDetail: 'detail',
  bidRequest: 'request',
  bidTest: 'test',
  bidDesigner: 'designer',
  bidSuggest: 'suggest',
  bidDetailDesigner: 'detailDesigner',
  bidPastDetail: 'pastDetail',
  notification: 'notification',
} as const;

export default ROUTES;
