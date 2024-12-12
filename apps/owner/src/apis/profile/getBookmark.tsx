import { APIClient } from '@daeng-ggu/shared';

export interface BookmarkData {
  bookmarkYn: boolean;
}
export interface BookmarkResponse {
  status: string;
  message: string;
  data: BookmarkData;
}
const getBookmark = async ({
  customerId,
  designerId,
  bookmarkYn,
}: {
  customerId: number;
  designerId: number;
  bookmarkYn: boolean;
}) => {
  const response = await APIClient.get('/daengggu/customer/bookmark', {
    customerId: customerId.toString(),
    designerId: designerId.toString(),
    bookmarkYn: bookmarkYn.toString(),
  });

  return response;
};
export default getBookmark;
