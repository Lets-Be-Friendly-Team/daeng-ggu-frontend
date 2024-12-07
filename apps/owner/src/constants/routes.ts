const ROUTES = {
  main: '',
  progress: 'progress',
  bid: 'bid',
  feed: 'feed',
  map: 'map',
  search: 'search',
  profile: 'profile',
  profileEdit: 'profile/edit',
  profileEditPet: 'profile/edit/:petId',
  profileAddPet: 'profile/pet/add',
  reviewDetail: 'profile/review/:reviewId',
  reservation: 'reservation',
  review: 'review',
  login: 'login',
  signup: 'signup',
  bidDetail: 'detail',
  bidRequest: 'request',
  bidTest: 'test',
  bidDesigner: 'designer',
  bidSuggest: 'suggest',
  bidDetailDesigner: 'detailDesigner',
} as const;

export default ROUTES;
