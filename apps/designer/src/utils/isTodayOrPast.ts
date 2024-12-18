// utils/compareDate.js
export const isTodayOrPast = (dateString: string) => {
  const [year, month, day] = dateString.split('-').map(Number);
  if (!year || !month || !day) {
    throw new Error('Invalid date format. Expected format: YYYY-MM-DD');
  }

  const inputDate = new Date(year, month - 1, day);
  const today = new Date();

  // 오늘의 날짜를 기준으로 시간 부분을 제거
  today.setHours(0, 0, 0, 0);

  return inputDate <= today;
};
