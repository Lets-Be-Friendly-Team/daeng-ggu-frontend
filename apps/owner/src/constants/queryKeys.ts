export const LOGIN_QUERY_KEYS = {
  LOGIN: (userType: 'C' | 'D') => ['login', userType],
  LOGOUT: ['logout'],
} as const;

export const REVIEW_QUERY_KEYS = {
  //   GET_REVIEW: ['getReview'],
  //   GET_REVIEW_LIST: ['getReviewList'],
  //   POST_REVIEW: ['postReview'],
  //   DELETE_REVIEW: ['deleteReview'],
  //   DETAILS: (id: string) => ['userDetails', id],
} as const;

export const CUSTOMER_QUERY_KEYS = {
  GET_PROFILE: (customerId: number) => ['getProfile', customerId],
  UPDATE_PROFILE: ['updateProfile'],
  GET_PROFILE_DETAIL: (customerId: number) => ['getProfileDetail', customerId],
  //   GET_USER_LIST: ['getUserList'],
  //   POST_USER: ['postUser'],
  //   DELETE_USER: ['delete]
} as const;

export const DESIGNER_QUERY_KEYS = {
  TOTAL_DESIGNERS: ['totalDesigners'],
} as const;

export const SEARCH_QUERY_KEYS = {
  SEARCH_DESIGNERS: (keyword: string) => ['searchedDesigners', keyword],
} as const;

export const RESERVATION_QUERY_KEYS = {
  GET_RESERVATION: (customerId: number) => ['getReservation', customerId],
} as const;
export const DESIGNER_QUERY_KEYS = {
  GET_DESIGNER_PROFILE: (designerId: number) => ['getDesignerProfile', designerId],
} as const;
