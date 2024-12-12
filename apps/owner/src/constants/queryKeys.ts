export const LOGIN_QUERY_KEYS = {
  LOGIN: (userType: 'C' | 'D') => ['login', userType],
  LOGOUT: ['logout'],
} as const;

export const REVIEW_QUERY_KEYS = {
  //   GET_REVIEW: ['getReview'],
  //   GET_REVIEW_LIST: ['getReviewList'],
  //   POST_REVIEW: ['postReview'],
  GET_REVIEW_DETAIL: (reviewId: number) => ['getReviewDetail', reviewId],
} as const;

export const USER_QUERY_KEYS = {
  GET_USER: ['getUser'],
  // GET_USER_LIST: ['getUserList'],
  POST_USER: ['postUser'],
  //   DELETE_USER: ['delete]
} as const;

export const CUSTOMER_QUERY_KEYS = {
  GET_PROFILE: (customerId: number) => ['getProfile', customerId],
  UPDATE_PROFILE: ['updateProfile'],
  GET_PROFILE_DETAIL: (customerId: number) => ['getProfileDetail', customerId],
  GET_BOOKMARK: (customerId: number, designerId: number, bookmarkYn: boolean) => [
    'getBookmark',
    customerId,
    designerId,
    bookmarkYn,
  ],
  //   GET_USER_LIST: ['getUserList'],
  //   POST_USER: ['postUser'],
  //   DELETE_USER: ['delete]
} as const;

export const DESIGNER_QUERY_KEYS = {
  TOTAL_DESIGNERS: ['totalDesigners'],
  GET_DESIGNER_PROFILE: (designerId: number) => ['getDesignerProfile', designerId],
  GET_PORTFOLIO_DETAIL: (designerId: number, portfolioId: number) => ['getPortfolioDetail', designerId, portfolioId],
} as const;

export const SEARCH_QUERY_KEYS = {
  SEARCH_DESIGNERS: (keyword: string) => ['searchedDesigners', keyword],
} as const;

export const RESERVATION_QUERY_KEYS = {
  GET_RESERVATION: (customerId: number) => ['getReservation', customerId],
} as const;
export const PET_QUERY_KEYS = {
  GET_PET_PROFILE_DETAIL: (customerId: number, petId: number) => ['getPetProfileDetail', customerId, petId],
};
