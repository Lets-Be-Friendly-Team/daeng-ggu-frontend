export interface OwnerInfoType {
  customerPhone: string;
  customerName: string;
  petInfo: OwnerPetInfoType;
  status: StatusType;
}

export interface OwnerPetInfoType {
  petName: string;
  petImgUrl: string;
  birthDate: string;
  gender: string;
  weight: number;
  specialNotes: string;
  majorBreed: string;
  subBreed: string;
  neutered: boolean;
}

export interface StatusType {
  isDelivery: boolean;
  processNum: number;
  processStatus: string;
  processMessage: string;
}
