// // src/hooks/request/useGetUserPendingRequests.ts
// import { useQuery } from '@tanstack/react-query';
// import getUserPendingRequests, { GetUserPendingResponse } from '@/apis/request/getUserPendingRequests';
//
// export const USER_PENDING_REQUESTS_QUERY_KEY = ['userPendingRequests'];
//
// const useGetUserPendingRequests = () => {
//   return useQuery<GetUserPendingResponse, Error>({
//     queryKey: USER_PENDING_REQUESTS_QUERY_KEY,
//     queryFn: async () => await getUserPendingRequests(),
//   });
// };
//
// export default useGetUserPendingRequests;
