export const breedList: Record<string, { code: string; sub: { code: string; label: string }[] }> = {
  소형견: {
    code: 'P1',
    sub: [
      { code: 'P101', label: '말티즈' },
      { code: 'P102', label: '미니어처 닥스훈트' },
      { code: 'P103', label: '미니어처 핀셔' },
      { code: 'P104', label: '미니어쳐 슈나우저' },
      { code: 'P105', label: '페키니즈' },
      { code: 'P106', label: '파피용' },
      { code: 'P107', label: '포메라니안' },
      { code: 'P108', label: '요크셔테리어' },
      { code: 'P109', label: '토이푸들' },
      { code: 'P110', label: '치와와' },
    ],
  },
  중형견: {
    code: 'P2',
    sub: [
      { code: 'P201', label: '아메리칸 핏불' },
      { code: 'P202', label: '보스턴테리어' },
      { code: 'P203', label: '슈나우져' },
      { code: 'P204', label: '시바견' },
      { code: 'P205', label: '코카스페니얼' },
      { code: 'P206', label: '프렌치 불독' },
    ],
  },
  대형견: {
    code: 'P3',
    sub: [
      { code: 'P301', label: '골든리트리버' },
      { code: 'P302', label: '래브라도 리트리버' },
      { code: 'P303', label: '로트와일러' },
      { code: 'P304', label: '시베리안 허스키' },
      { code: 'P305', label: '알래스카 말라뮤트' },
      { code: 'P306', label: '올드 잉글리시 쉽독' },
      { code: 'P307', label: '저먼 셰퍼드' },
      { code: 'P308', label: '차우차우' },
    ],
  },
  특수견: {
    code: 'P4',
    sub: [
      { code: 'P401', label: '배들링턴 테리어' },
      { code: 'P402', label: '보더콜리' },
      { code: 'P403', label: '비글' },
      { code: 'P404', label: '비숑 프리제' },
      { code: 'P405', label: '사모예드' },
      { code: 'P406', label: '웰시코기' },
      { code: 'P407', label: '꼬똥 드 툴레아' },
    ],
  },
};
