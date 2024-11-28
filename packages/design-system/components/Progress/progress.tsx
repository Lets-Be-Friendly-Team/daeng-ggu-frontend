import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '../../lib/utils';

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  text?: string;
  value?: number;
  maxStep?: number;
}

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, value = 0, text = '내용입력', maxStep = 10, ...props }, ref) => {
    const normalizedValue = Math.min(value, maxStep); //그래프 평준화

    const percentage = (normalizedValue / maxStep) * 100;

    return (
      <div className='w-full flex-col justify-center'>
        <div className='mb-1 flex w-full items-center justify-between text-h3 font-bold'>
          <span>{text}</span>
          <span className='text-gray-500'>
            [{normalizedValue}/{maxStep}]
          </span>
        </div>

        <ProgressPrimitive.Root
          ref={ref}
          className={cn('relative h-2 w-full overflow-hidden rounded-full bg-secondary', className)}
          {...props}
        >
          <ProgressPrimitive.Indicator
            className='h-full flex-1 bg-primary transition-all'
            style={{
              transform: `translateX(-${100 - percentage}%)`,
            }}
          />
        </ProgressPrimitive.Root>
      </div>
    );
  },
);

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
