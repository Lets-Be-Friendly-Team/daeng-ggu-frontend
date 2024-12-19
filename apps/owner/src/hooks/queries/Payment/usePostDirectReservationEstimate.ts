// src/hooks/queries/Payment/usePostReservationEstimate.ts

import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';

import {
  DirectPaymentDetails,
  postDirectReservationEstimate,
  ResponseStatus,
} from '@/apis/payment/postDirectReservation.ts';

const usePostDirectReservationEstimate = (
  options?: UseMutationOptions<ResponseStatus, Error, DirectPaymentDetails>,
): UseMutationResult<ResponseStatus, Error, DirectPaymentDetails> => {
  return useMutation<ResponseStatus, Error, DirectPaymentDetails>({
    mutationFn: (details: DirectPaymentDetails) => {
      console.log('Request Data (before posting reservation estimate):', details);
      return postDirectReservationEstimate(details);
    },
    ...options,
  });
};

export default usePostDirectReservationEstimate;
