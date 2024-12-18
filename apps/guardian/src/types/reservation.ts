export interface ReservationType {
  reservationId: number;
  reservationDate: string;
  startTime: number;
  isFinished: boolean;
  isProcess: boolean;
  customerAddress: string;
  shopAddress: string;
  petInfo: ReservationPetInfo;
}

export interface ReservationPetInfo {
  petName: string;
  birthDate: string;
  petImgUrl: string;
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

export interface ReservationInfo {
  reservationId: number;
  reservationDate: string;
  startTime: number;
  isFinished: true;
  processId: number;
  customerAddress: string;
  shopAddress: string;
  petInfo: ReservationPetInfo;
}
