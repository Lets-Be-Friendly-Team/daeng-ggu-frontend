import React from 'react';

interface TypeTwoButtonProps {
  text?: string;
  color?: string;
  onClick?: () => void;
}

const TypeTwoButton: React.FC<TypeTwoButtonProps> = ({ text, color, onClick }) => {
  const textColor =
    color === 'bg-primary'
      ? 'text-white'
      : color === 'bg-secondary'
        ? 'text-primary border border-primary'
        : 'text-black';

  return (
    <button
      className={`hover:bg-opacity-80 mt-6 h-[48px] max-w-[280px] w-full rounded border px-4 py-2 text-body2 font-bold ${color} ${textColor}`}
      onClick={onClick}
    >
      {text ? text : '내용없음'}
    </button>
  );
};

export default TypeTwoButton;
