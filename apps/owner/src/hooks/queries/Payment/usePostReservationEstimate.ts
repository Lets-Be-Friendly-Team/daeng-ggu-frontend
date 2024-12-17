// src/hooks/queries/Payment/usePostReservationEstimate.ts

import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';

import { PaymentDetails, postReservationEstimate, ResponseStatus } from '@/apis/payment/postReservationEstimate';

const usePostReservationEstimate = (
  options?: UseMutationOptions<ResponseStatus, Error, PaymentDetails>,
): UseMutationResult<ResponseStatus, Error, PaymentDetails> => {
  return useMutation<ResponseStatus, Error, PaymentDetails>({
    mutationFn: (details: PaymentDetails) => {
      console.log('Request Data (before posting reservation estimate):', details);
      return postReservationEstimate(details);
    },
    ...options,
  });
};

export default usePostReservationEstimate;
