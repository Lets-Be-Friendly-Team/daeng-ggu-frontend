import { SVGProps } from 'react';

import { cn } from '../../lib/utils';

interface ICloseIconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}
const CloseIcon = ({ className }: ICloseIconProps) => {
  return (
    <svg
      className={cn('stroke-gray-800', className)}
      width='18'
      height='18'
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M14.25 3.75L3.75 14.25M3.75 3.75L14.25 14.25'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default CloseIcon;
