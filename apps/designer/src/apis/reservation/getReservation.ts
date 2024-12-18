import { APIClient } from '@daeng-ggu/shared';

export interface Reservation {
  reservationId: number;
  petName: string;
  customerNickname: string;
  customerImgUrl: string;
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
  isProcess: boolean;
  requestDetail: {
    desiredService: string;
    lastGroomingDate: string;
    isDelivery: boolean;
    desiredRegion: string;
    isMonitoring: boolean;
    additionalRequest: string;
  };
}
export interface ReservationResponse {
  status: string;
  message: string;
  data: Reservation[];
}
const getReservations = async () => {
  const response = await APIClient.get<ReservationResponse>(`/daengggu/designer/reservations`);
  return response;
};
export default getReservations;
