const formatDateTime = (dateTimeString: string) => {
  try {
    return dateTimeString
      .split(', ') // 여러 날짜가 있는 경우 개별적으로 처리
      .map((dateTime) => {
        const date = new Date(dateTime);
        return new Intl.DateTimeFormat('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        }).format(date);
      })
      .join(', ');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Invalid date format:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    return dateTimeString; // 유효하지 않은 경우 원래 값을 반환
  }
};
export default formatDateTime;
