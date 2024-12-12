import { APIClient } from '@daeng-ggu/shared';

import { DefaultResponse } from '@/types/api.ts';

export interface GetOwnerPetProfileResponse {
  petId: number;
  petName: string;
  petImageUrl: string;
  petImgName: string;
  birthDate: string;
  gender: string;
  isNeutered: boolean;
  weight: number;
  majorBreedCode: string;
  majorBreed: string;
  subBreedCode: string;
  subBreed: string;
  specialNotes?: string;
  isRequested: boolean;
  customerName: string;
  phone: string;
  address: string;
}

export interface GetOwnerPetProfileGroupResponse {
  petList: GetOwnerPetProfileResponse[];
}

const getOwnerPetProfile = async (): Promise<GetOwnerPetProfileResponse[]> => {
  const responses = await APIClient.get<DefaultResponse<GetOwnerPetProfileResponse>>('/daengggu/bid/request/pet');
  console.log('hi this is me', responses);
  return responses.data;
};

export default getOwnerPetProfile;
