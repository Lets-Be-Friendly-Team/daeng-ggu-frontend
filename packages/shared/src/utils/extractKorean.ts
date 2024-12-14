const extractKorean = (text: string): string => {
  const match = text.match(/^[가-힣\s]+/);
  return match ? match[0].trim() : '';
};
export default extractKorean;
