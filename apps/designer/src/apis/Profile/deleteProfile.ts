import { APIClient } from '@daeng-ggu/shared';

export interface DeleteProfileResponse {
  status: string;
  data: null;
  message: string;
}
const deleteProfile = async ({ designerId }: { designerId: number }): Promise<DeleteProfileResponse> => {
  return await APIClient.delete(`/daengggu/designer/profile/delete/${designerId}`);
};
export default deleteProfile;
