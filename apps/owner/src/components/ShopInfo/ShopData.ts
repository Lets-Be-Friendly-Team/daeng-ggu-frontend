// 타입 정의
type Designer = {
  designerId: number;
  designerName: string;
  nickname: string;
  designerImgUrl: string;
  reviewStarAvg: number;
  bookmarkCnt: number;
  address1: string;
  address2: string;
  detailAddress: string;
  possibleBreed: ('소형견' | '중형견' | '대형견' | '특수견')[];
  xPosition: number;
  yPosition: number;
};

// 더미 데이터
export const designerList: Designer[] = [
  {
    designerId: 1,
    designerName: '김디자이너',

    nickname: 'MIRACLE DOG',
    designerImgUrl: 'http://elemental04.com/upfile/board/2204102107477803.jpg',
    bookmarkCnt: 150,
    address1: '서울 강남구 대치동',
    reviewStarAvg: 4.8,
    address2: '서울 강남구 선릉로 428',
    detailAddress: '101호',
    possibleBreed: ['소형견', '중형견'],
    xPosition: 37.4979,
    yPosition: 127.0276,
  },
  {
    designerId: 2,
    designerName: '박디자이너',
    nickname: 'DOG BONITA',
    designerImgUrl: 'https://s3.qplace.kr/portfolio/494/9d13b0c7c285735cdb5c41aa415df975_w800.webp',
    reviewStarAvg: 4.5,
    bookmarkCnt: 120,
    address1: '서울 동작구 상도동',
    address2: '서울 동작구 상도로 207',
    detailAddress: '201호',
    possibleBreed: ['대형견', '특수견'],
    xPosition: 35.1631,
    yPosition: 129.1639,
  },
  {
    designerId: 3,
    designerName: '이디자이너',
    nickname: 'mellow grooming',
    designerImgUrl: 'https://www.designw.kr/data/editor/2407/b317e5a1a73f6646ec124fcdacba3c92_1722172679_5123.jpg',
    reviewStarAvg: 4.9,
    bookmarkCnt: 200,
    address1: '광주 북구 양산동',
    address2: '광주 북구 양일로 82',
    detailAddress: '1층 101호',
    possibleBreed: ['소형견', '특수견'],
    xPosition: 35.8587,
    yPosition: 128.57,
  },
];

export default designerList;
