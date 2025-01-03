import { APIClient } from '@daeng-ggu/shared';

export interface PetData {
  petId: number;
  petName: string;
  petImgUrl: string;
  majorBreedCode: string;
  majorBreed: string;
  subBreedCode: string;
  subBreed: string;
  birthDate: string;
  gender: string;
  isNeutered: string;
  weight: number;
  specialNotes: string;
}
export interface PetDataResponse {
  status: string;
  message: string;
  data: PetData;
}
const getPetProfileDetail = async ({
  customerId,
  petId,
}: {
  customerId: number;
  petId: number;
}): Promise<PetDataResponse> => {
  return await APIClient.get('/daengggu/pet/profile/detail', {
    customerId: customerId.toString(),
    petId: petId.toString(),
  });
};
export default getPetProfileDetail;
