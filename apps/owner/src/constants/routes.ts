const ROUTES = {
  main: '/',
  progress: '/progress',
  bid: '/bid',
  feed: '/feed',
  map: '/map',
  search: '/search',
  profile: '/profile',
  profileEdit: '/profile/edit',
  profileEditPet: '/profile/edit/:petId',
  profileAddPet: '/profile/pet/add',
  reviewDetail: '/profile/review/:reviewId',
  reservation: '/profile/reservation',
} as const;

export default ROUTES;
