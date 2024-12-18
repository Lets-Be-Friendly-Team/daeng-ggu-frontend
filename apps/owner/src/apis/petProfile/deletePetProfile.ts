import { APIClient } from '@daeng-ggu/shared';

export interface PetDataResponse {
  status: string;
  message: string;
  data: string;
}
const deletePetProfile = async ({ customerId, petId }: { customerId: number; petId: number }) => {
  return await APIClient.delete('/daengggu/pet/profile/delete', {
    customerId: customerId.toString(),
    petId: petId.toString(),
  });
};
export default deletePetProfile;
