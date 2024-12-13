const debounce = <T extends (..._args: unknown[]) => void>(
  func: T,
  delay: number,
): ((..._args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (..._args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId); // 이전 타이머 취소
    }
    timeoutId = setTimeout(() => {
      func(..._args); // 딜레이 후 함수 실행
    }, delay);
  };
};

export default debounce;
