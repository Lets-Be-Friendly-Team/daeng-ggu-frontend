import { APIClient } from '@daeng-ggu/shared';

import { DefaultResponse } from '@/types/api';

export interface HomeMapParams {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}
export interface DesignerInfo {
  designerId: number;
  designerName: string;
  nickname: string;
  lng: number;
  lat: number;
  address1: string;
  address2: string;
  detailAddress: string;
}

const getHomeMap = async ({ minX, maxX, minY, maxY }: HomeMapParams) => {
  return await APIClient.get<DefaultResponse<DesignerInfo>>('daengggu/home/map', {
    minX: minX.toString(),
    maxX: maxX.toString(),
    minY: minY.toString(),
    maxY: maxY.toString(),
  });
};

export default getHomeMap;
