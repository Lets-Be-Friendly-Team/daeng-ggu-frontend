import React, { ButtonHTMLAttributes } from 'react';
import { Spinner } from '@daeng-ggu/shared';

import { cn } from '../../lib/utils';

interface TypeTwoButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: React.ReactNode;
  color?: string;
  onClick?: () => void;
  className?: string;
  fontWeight?: string;
  border?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  isLoading?: boolean;
}

const TypeTwoButton = ({
  className,
  text,
  color,
  onClick,
  fontWeight,
  border,
  type,
  isLoading = false,
  ...props
}: TypeTwoButtonProps) => {
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
        `flex h-[48px] w-full items-center justify-center gap-[1rem] rounded-md px-4 py-2 ${fontWeightClass} ${borderClass} hover:bg-opacity-80 ${color} ${textColor}`,
        className,
      )}
      onClick={onClick}
      type={type}
    >
      {isLoading && <Spinner />}
      <div className='text-ellipsis whitespace-nowrap text-body3'>{text ? text : '내용없음'}</div>
    </button>
  );
};

export default TypeTwoButton;
