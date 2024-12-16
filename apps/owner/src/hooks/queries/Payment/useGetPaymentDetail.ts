// src/hooks/payment/useGetPaymentDetails.ts

import { useSuspenseQuery } from '@tanstack/react-query';

import getPaymentDetails, { PaymentDetailsResponse } from '@/apis/payment/getPaymentOrderId';

export const PAYMENT_DETAILS_QUERY_KEY = ['paymentDetails'];

const useGetPaymentDetails = () => {
  return useSuspenseQuery<PaymentDetailsResponse, Error>({
    queryKey: PAYMENT_DETAILS_QUERY_KEY,
    queryFn: getPaymentDetails,
  });
};

export default useGetPaymentDetails;
