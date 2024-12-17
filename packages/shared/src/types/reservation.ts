export interface ReservationType {
  reservationId: number;
  reservationDate: string;
  startTime: number;
  customerAddress: string;
  shopAddress: string;
  petInfo: ReservationPetInfo;
}

export interface ReservationPetInfo {
  petName: string;
  birthDate: string;
  gender: string;
  weight: number;
  specialNotes: string;
  majorBreed: string;
  subBreed: string;
  neutered: boolean;
}

export interface ReservationStatusType {
  isDelivery: boolean;
  processNum: number;
  processStatus: string;
  processMessage: string;
}
