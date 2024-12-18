// src/hooks/queries/Payment/useGetPaymentProcess.ts
import { useQuery } from '@tanstack/react-query';

import { PaymentProcessRequest, PaymentProcessResponse, postPaymentProcess } from '@/apis/payment/postPaymentProcess';

interface UseGetPaymentProcessOptions extends PaymentProcessRequest {
  enabled?: boolean;
}

const useGetPaymentProcess = ({ customerKey, orderId, amount, enabled = true }: UseGetPaymentProcessOptions) => {
  if (!customerKey || !orderId || amount === undefined) {
    throw new Error('customerKey, orderId and amount are required.');
  }

  return useQuery<PaymentProcessResponse, Error>({
    queryKey: ['paymentProcess', customerKey, orderId, amount],
    queryFn: () => postPaymentProcess({ customerKey, orderId, amount }),
    enabled,
  });
};

export default useGetPaymentProcess;
