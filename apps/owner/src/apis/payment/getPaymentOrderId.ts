// src/apis/payment/getPaymentOrderId.ts
import { APIClient } from '@daeng-ggu/shared';

import { SecondDefaultResponse } from '@/types/api';

export interface PaymentDetailsResponse {
  customerKey: string;
  orderId: string;
}

const getPaymentOrderId = async (): Promise<PaymentDetailsResponse> => {
  const url = '/daengggu/reservation/payment/keys';
  try {
    const response = await APIClient.get<SecondDefaultResponse<PaymentDetailsResponse>>(url);
    console.log('Payment details response: ', response);
    if (response.status === 'SUCCESS') {
      return response.data;
    } else {
      throw new Error(response.status || 'Failed to fetch payment details.');
    }
  } catch (error) {
    console.error('Error fetching payment details:', error);
    throw error;
  }
};
export default getPaymentOrderId;
