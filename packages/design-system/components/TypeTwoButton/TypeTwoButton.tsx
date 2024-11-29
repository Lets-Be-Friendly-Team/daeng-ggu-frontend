interface TypeTwoButtonProps {
  text?: string;
  color?: string;
  onClick?: () => void;
}

const TypeTwoButton = ({ text, color, onClick }: TypeTwoButtonProps) => {
  const textColor =
    color === 'bg-primary'
      ? 'text-white'
      : color === 'bg-secondary'
        ? 'text-primary border border-primary'
        : 'text-black';

  return (
    <button
      className={`mt-6 h-[48px] w-full max-w-[280px] rounded border px-4 py-2 text-body2 font-bold hover:bg-opacity-80 ${color} ${textColor}`}
      onClick={onClick}
    >
      {text ? text : '내용없음'}
    </button>
  );
};

export default TypeTwoButton;
