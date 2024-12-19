// src/apis/payment/postReservationEstimate.ts
import { APIClient } from '@daeng-ggu/shared';

export interface DirectPaymentDetails {
  paymentKey: string; // 결제 key (토스에서 제공)
  orderId: string; // 주문 id
  amount: number; // 결제 금액
  reservationDate: string; // 예약 일자 (예: 2024-12-01)
  startTime: string; // 시작 시간 (예: 10:00:00)
  endTime: string; // 종료 시간 (예: 10:00:00)
  groomingFee: number; // 미용비
  deliveryFee: number; // 댕동비
  monitoringFee: number; // 모니터링 비
  totalPayment: number; // 총 결제금액
  // add
  petId: number;
  designerId: number;
  desiredService: string;
  lastGroomingDate: string;
  isDelivery: boolean;
  isMonitoring: boolean;
  additionalRequest: string;
}

export interface ResponseStatus {
  status: string;
  message: string;
  data?: {
    reservationId: number;
  };
}

export const postDirectReservationEstimate = async (details: DirectPaymentDetails): Promise<ResponseStatus> => {
  const response = await APIClient.post<ResponseStatus>('/daengggu/reservation/direct', details);
  console.log('payment detail: ', response);
  return response;
};
