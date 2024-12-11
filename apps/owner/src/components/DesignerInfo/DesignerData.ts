// 타입 정의
export type possibleBreed = {
  breedCode: string;
  codeDesc: string;
};
export type DesignerType = {
  designerId: number;
  designerName: string;
  nickname: string;
  designerImgUrl: string;
  reviewStarAvg: number;
  bookmarkCnt: number;
  address1: string;
  address2: string;
  detailAddress: string;
  possibleBreed: possibleBreed[];
  lng: number;
  lat: number;
};
export type DesignerListType = {
  allDesignerList: DesignerType[];
  popularList: DesignerType[];
  premiumSpList: DesignerType[];
  premiumFcList: DesignerType[];
  premiumStList: DesignerType[];
};
