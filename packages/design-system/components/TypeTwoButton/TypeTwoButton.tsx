import React, { ButtonHTMLAttributes } from 'react';

import { cn } from '../../lib/utils';

interface TypeTwoButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: React.ReactNode;
  color?: string;
  onClick?: () => void;
  className?: string;
  fontWeight?: string;
  border?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

const TypeTwoButton = ({ className, text, color, onClick, fontWeight, border, type, ...props }: TypeTwoButtonProps) => {
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
      {...props}
      className={cn(
        `h-[48px] w-full rounded-md px-4 py-2 ${fontWeightClass} ${borderClass} hover:bg-opacity-80 ${color} ${textColor}`,
        className,
      )}
      onClick={onClick}
      type={type}
    >
      <p className='text-ellipsis whitespace-nowrap text-body3'>{text ? text : '내용없음'}</p>
    </button>
  );
};

export default TypeTwoButton;
