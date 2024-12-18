export const parseDate = (dateString: string) => {
  // 입력 형식: "YYYY-MM-DD"
  const [year, month, day] = dateString.split('-').map(Number);
  if (!year || !month || !day) {
    throw new Error('Invalid date format. Expected format: YYYY-MM-DD');
  }
  // JavaScript에서 month는 0부터 시작 (0 = January, 11 = December)
  return new Date(year, month - 1, day);
};
