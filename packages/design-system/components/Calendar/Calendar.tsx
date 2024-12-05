import { ComponentProps } from 'react';
import { DayPicker } from 'react-day-picker';
import { ko } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '../../lib/utils';

import { buttonVariants } from './buttonVariants';

export type CalendarProps = ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      locale={ko}
      showOutsideDays={showOutsideDays}
      className={cn('p-3 font-pretendard', className)}
      classNames={{
        // Keeping head styles unchanged
        months: 'flex flex-row h-full',
        month: 'space-y-4 w-full',
        caption: 'flex justify-center pt-1 relative items-center text-lg',
        caption_label: 'text-[2rem] font-bold',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(buttonVariants({ variant: 'outline' }), 'bg-transparent p-6 opacity-50 hover:opacity-100'),
        nav_button_previous: 'absolute left-1 w-[2rem] h-[2rem]',
        nav_button_next: 'absolute right-1 w-[2rem] h-[2rem]',
        table: 'w-full border-collapse',
        head_row: 'flex w-full justify-between mt-8',
        head_cell: 'text-[2rem] w-full flex justify-center text-gray-800 rounded-md font-regular',
        // Adjusting the date part for dynamic gaps
        row: 'flex mt-4 justify-between', // Changed justify-center to justify-between
        cell: cn(
          'relative flex-1 p-2 sm:p-2 md:p-4 text-center',
          'focus-within:relative focus-within:z-20',
          '[&:has([aria-selected])]:bg-white',
          '[&:has([aria-selected].day-outside)]:bg-white',
          '[&:has([aria-selected].day-range-end)]:rounded-r-md',
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'w-full h-full text-[1.6rem] p-0 font-regular',
          'aria-selected:opacity-100 day_outside:text-gray-200',
        ),
        // Keeping other day styles unchanged
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary text-white hover:bg-primary hover:text-secondary focus:bg-primary focus:text-secondary',
        day_today: 'bg-secondary text-black aria-selected:bg-primary aria-selected:text-white',
        day_outside: 'day-outside text-gray-200 aria-selected:bg-primary/50 aria-selected:text-secondary',
        day_disabled: 'text-gray-500 opacity-50',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className='h-4 w-4' />,
        IconRight: () => <ChevronRight className='h-4 w-4' />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export default Calendar;
