// src/hooks/useCreateBidRequest.ts

import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';

import { BidRequestData, BidRequestResponse, postCreateBidRequest } from '@/apis/request/postCreateBidRequest';
import { PENDING_REQUESTS_QUERY_KEY } from '@/hooks/queries/Request/useGetPendingRequests';
import { USER_COMPLETED_REQUESTS_QUERY_KEY } from '@/hooks/queries/Request/useGetUserCompletedRequests';
// import { useToast } from '@daeng-ggu/shared'; // Corrected import path

/**
 * Custom hook to create a bid request using React Query's useMutation.
 *
 * @returns A mutation object containing mutate function and mutation state.
 */
const useCreateBidRequest = (): UseMutationResult<BidRequestResponse, Error, BidRequestData> => {
  const queryClient = useQueryClient();
  // const { showToast } = useToast();
  return useMutation<BidRequestResponse, Error, BidRequestData>({
    mutationFn: (data: BidRequestData) => postCreateBidRequest(data),
    onSuccess: (data) => {
      // Optional: Handle success globally, e.g., show a toast notification
      console.log('Bid request created successfully:', data);
      queryClient.invalidateQueries({ queryKey: PENDING_REQUESTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: USER_COMPLETED_REQUESTS_QUERY_KEY });
    },
    onError: (error) => {
      // Optional: Handle errors globally
      console.error('Error creating bid request:', error);
    },
    // Optional: You can add onSettled, onMutate, etc., for more advanced usage
  });
};

export default useCreateBidRequest;
