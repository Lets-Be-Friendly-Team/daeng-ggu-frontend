// src/hooks/queries/Request/usePutSuggest.ts
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';

import { BidRequestResponse, EstimateRequestPayload, putSuggest } from '@/apis/request/putSuggest';

/**
 * Custom hook to handle the PUT suggest mutation using React Query.
 *
 * @param options - Optional mutation options for handling success and error states.
 * @returns A mutation object containing the mutate function and mutation state.
 */
const usePutSuggest = (
  options?: UseMutationOptions<BidRequestResponse, Error, EstimateRequestPayload>,
): UseMutationResult<BidRequestResponse, Error, EstimateRequestPayload> => {
  return useMutation<BidRequestResponse, Error, EstimateRequestPayload>({
    mutationFn: putSuggest,
    ...options,
  });
};

export default usePutSuggest;
