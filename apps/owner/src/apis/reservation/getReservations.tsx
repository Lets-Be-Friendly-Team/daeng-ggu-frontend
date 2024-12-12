import { APIClient } from '@daeng-ggu/shared';

export interface RequestDetailData {
  desiredService: string;
  lastGroomingDate: string;
  isDelivery: boolean;
  desiredRegion: string;
  isMonitoring: boolean;
  additionalRequest: string;
}
export interface ReservationData {
  reservationId: number;
  petName: string;
  majorBreedCode: string;
  majorBreed: string;
  subBreedCode: string;
  subBreed: string;
  reservationType: string;
  isFinished: boolean;
  isCanceled: boolean;
  reservationDate: string;
  dayOfWeek: string;
  amPm: string;
  startTime: number;
  groomingFee: number;
  deliveryFee: number;
  monitoringFee: number;
  totalPayment: number;
  estimateDetail: string;
  reauestDetail: RequestDetailData;
}

export interface ReservationResponse {
  status: string;
  message: string;
  data: ReservationData[];
}
const getReservations = async ({ customerId }: { customerId: number }): Promise<ReservationResponse> => {
  return await APIClient.get('/daenggu/reservations', { customerId: customerId.toString() });
};
export default getReservations;
