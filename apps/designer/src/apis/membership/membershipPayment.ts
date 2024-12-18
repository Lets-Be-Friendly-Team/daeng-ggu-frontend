// 디자이너 멤버십 결제
export interface PaymentResponse {
  status: string; // 요청 상태 (e.g., SUCCESS)
  message: string; // 응답 메시지
  data: {
    paymentKey: string; // 결제 키
    orderId: string; // 주문 ID
    status: string; // 결제 상태
    totalAmount: number; // 총 결제 금액
    approvedAt: string; // 승인 시간 (ISO 8601 형식)
    receiptUrl: string; // 영수증 URL
    method: string; // 결제 방법
    failure: string; // 결제 실패 사유 (있다면)
  };
}

// const membershipPayment = (): Promise<PaymentResponse> => {};
// export default membershipPayment;
