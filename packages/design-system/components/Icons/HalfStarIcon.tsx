import { SVGProps } from 'react';

import { cn } from '../../lib/utils';

interface HalfStarIconProps extends SVGProps<SVGSVGElement> {
  className?: string; // Tailwind로 스타일 추가 가능
  strokeColor?: string; // 테두리 색상
  fillColor?: string; // 채우기 색상
}

const HalfStarIcon = ({
  className,
  strokeColor = 'stroke-yellow-300', // 기본 테두리 색상
  fillColor = 'fill-yellow-300', // 기본 채우기 색상
  ...props
}: HalfStarIconProps) => {
  return (
    <div className={cn('relative h-[4rem] w-[4rem]', className)}>
      {/* Stroke (항상 전체 별에 적용) */}
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='-20 -20 616 552' {...props}>
        {/* 전체 별의 테두리 */}
        <path
          d='M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z'
          fill='none'
          className={cn(strokeColor, 'stroke-[3rem]')} // 동적 테두리 색상
        />
        {/* 반쪽 채우기 */}
        <defs>
          <clipPath id='half-clip'>
            <rect x='0' y='0' width='50%' height='100%' />
          </clipPath>
        </defs>
        <path
          d='M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z'
          clipPath='url(#half-clip)'
          className={fillColor} // 동적 채우기 색상
        />
      </svg>
    </div>
  );
};

export default HalfStarIcon;
