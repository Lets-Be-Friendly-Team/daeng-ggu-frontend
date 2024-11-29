/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import { isSunday } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '../../lib/utils';
import { buttonVariants } from '../Calendar/buttonVariants';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      locale={ko}
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium ',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1 ',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'text-gray-800 rounded-md w-8 font-normal text-[0.8rem] ',
        row: 'flex w-full mt-2',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-white [&:has([aria-selected].day-outside)]:bg-white [&:has([aria-selected].day-range-end)]:rounded-r-md',
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-8 w-8 p-0 font-normal aria-selected:opacity-100 day_outside:text-gray-200',
        ),
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary text-white hover:bg-primary hover:text-secondary focus:bg-primary focus:text-secondary',
        day_today: 'bg-secondary text-black aria-selected:bg-primary aria-selected:text-white',
        day_outside: 'day-outside text-gray-200 aria-selected:bg-primary/50 aria-selected:text-secondary',
        day_disabled: 'text-gray-500 opacity-50',
        day_range_middle: 'aria-selected:bg-primary aria-selected:text-primary',
        day_hidden: 'invisible',
        ...classNames,
      }}
      // modifiers={{ sunday: (date) => isSunday(date) }}
      // modifiersClassNames={{
      //   // sunday: 'text-warning',
      //   sunday: 'text-black',
      //   outside: 'text-gray-200',
      // }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className='h-4 w-4' />,
        IconRight: ({ ...props }) => <ChevronRight className='h-4 w-4' />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export default Calendar;
