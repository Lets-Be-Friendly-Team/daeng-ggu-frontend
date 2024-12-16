// src/apis/payment/getPaymentDetails.ts

import { APIClient } from '@daeng-ggu/shared';

import { SecondDefaultResponse } from '@/types/api';

export interface PaymentDetailsResponse {
  customerKey: string;
  orderId: string;
}

const getPaymentDetails = async (): Promise<PaymentDetailsResponse> => {
  const url = '/daengggu/reservation/payment/keys';
  try {
    const response = await APIClient.get<SecondDefaultResponse<PaymentDetailsResponse>>(`${url}`);

    if (response.status === 'success') {
      return response.data;
    } else {
      throw new Error(response.message || 'Failed to fetch payment details.');
    }
  } catch (error) {
    console.error('Error fetching payment details:', error);
    throw error;
  }
};
export default getPaymentDetails;
