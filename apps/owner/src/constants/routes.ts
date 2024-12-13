const ROUTES = {
  main: '/',
  progress: 'progress',
  bid: 'bid',
  feed: 'feed',
  map: 'map',
  search: 'search',
  loginCallback: 'callback',
  profile: 'profile',
  profileEdit: 'edit',
  profileEditPet: 'pet/edit/:petId',
  profileAddPet: 'pet/add',
  reviewDetail: 'review/:reviewId',
  portfolioDetail: 'portfolio/:portfolioId',
  reservation: 'reservation',
  designerProfile: 'designer/:designerId',
  // profileEdit: 'profile/edit',
  // profileEditPet: 'profile/edit/:petId',
  // profileAddPet: 'profile/pet/add',
  // reviewDetail: 'profile/review/:reviewId',
  // portfolioDetail: 'profile/portfolio/:portfolioId',
  // reservation: 'profile/reservation',
  // designerProfile: 'profile/:designerId',

  review: 'review',
  login: 'login',
  signup: 'signup',
  signupSuccess: 'success',
  bidDetail: 'detail',
  bidRequest: 'request',
  bidTest: 'test',
  bidDesigner: 'designer',
  bidSuggest: 'suggest',
  bidDetailDesigner: 'detailDesigner',
  notification: 'notification',
} as const;

export default ROUTES;
