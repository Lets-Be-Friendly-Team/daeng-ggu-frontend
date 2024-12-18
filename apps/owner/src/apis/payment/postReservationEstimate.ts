// src/apis/payment/postReservationEstimate.ts
import { APIClient } from '@daeng-ggu/shared';

export interface PaymentDetails {
  paymentKey: string; // 결제 key (토스에서 제공)
  orderId: string; // 주문 id
  amount: number; // 결제 금액
  estimateId: number; // 견적서 아이디
  reservationDate: string; // 예약 일자 (예: 2024-12-01)
  startTime: string; // 시작 시간 (예: 10:00:00)
  endTime: string; // 종료 시간 (예: 10:00:00)
  groomingFee: number; // 미용비
  deliveryFee: number; // 댕동비
  monitoringFee: number; // 모니터링 비
  totalPayment: number; // 총 결제금액
}

export interface ResponseStatus {
  status: string;
  message: string;
  data?: {
    reservationId: number;
  };
}

export const postReservationEstimate = async (details: PaymentDetails): Promise<ResponseStatus> => {
  const response = await APIClient.post<ResponseStatus>('/daengggu/reservation/estimate', details);
  console.log('payment detail: ', response);
  return response;
};
