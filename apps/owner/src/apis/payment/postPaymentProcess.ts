// src/apis/postPaymentProcess.ts
import { APIClient } from '@daeng-ggu/shared';

export interface PaymentProcessRequest {
  customerKey: string;
  orderId: string;
  amount: number;
}

export interface PaymentProcessResponse {
  status: string;
  message: string;
  data: null;
}

export const postPaymentProcess = async (data: PaymentProcessRequest): Promise<PaymentProcessResponse> => {
  const response = await APIClient.post<PaymentProcessResponse>('/daengggu/reservation/payment/data', data);
  console.log('결제 과정 기록저장스: ', response);
  return response;
};
