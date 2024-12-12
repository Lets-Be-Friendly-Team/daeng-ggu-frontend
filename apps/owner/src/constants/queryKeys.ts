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

export const USER_QUERY_KEYS = {
  //   GET_USER: ['getUser'],
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
