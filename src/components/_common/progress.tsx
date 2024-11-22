// Progress component
import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  text?: string;
  index?: number;
  maxStep?: number;
}

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, value, text = '내용입력', index = value, maxStep = 0, ...props }, ref) => (
    <div className='w-full flex-col justify-center'>
      <div className='mb-1 flex w-full items-center justify-between text-h3 font-bold'>
        <span>{text}</span>
        <span className='text-gray-500'>
          [{index}/{maxStep}]
        </span>
      </div>

      <ProgressPrimitive.Root
        ref={ref}
        className={cn('relative h-4 w-full overflow-hidden rounded-full bg-secondary', className)}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className='h-full w-full flex-1 bg-primary transition-all'
          style={{
            transform: `translateX(-${100 - (value == undefined ? 0 : value * 10 || 0)}%)`,
          }}
        />
      </ProgressPrimitive.Root>
    </div>
  ),
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
