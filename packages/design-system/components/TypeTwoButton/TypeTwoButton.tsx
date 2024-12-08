import React from 'react';

import { cn } from '../../lib/utils';

interface TypeTwoButtonProps {
  text?: React.ReactNode;
  color?: string;
  onClick?: () => void;
  className?: string;
  fontWeight?: string;
  border?: string;
}

const TypeTwoButton = ({ className, text, color, onClick, fontWeight, border }: TypeTwoButtonProps) => {
  const textColor =
    color === 'bg-primary'
      ? 'text-white'
      : color === 'bg-secondary'
        ? 'text-primary border border-primary'
        : 'text-black';
  const fontWeightClass = fontWeight ? `${fontWeight}` : 'font-bold';
  const borderClass = border ? `${border}` : '';
  return (
    <button
      className={cn(
        `h-[48px] w-full rounded-md px-4 py-2 ${fontWeightClass} ${borderClass} hover:bg-opacity-80 ${color} ${textColor}`,
        className,
      )}
      onClick={onClick}
    >
      <p className='text-body3'>{text ? text : '내용없음'}</p>
    </button>
  );
};

export default TypeTwoButton;
