import { ComponentProps } from 'react';
import { DayContentProps, DayPicker } from 'react-day-picker';
import { isToday } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '../../lib/utils';

export type CalendarProps = ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  // Custom DayContent component
  function CustomDayContent(dayContentProps: DayContentProps) {
    const { date } = dayContentProps;
    const dayNumber = date.getDate();
    const isCurrentDay = isToday(date);

    return (
      <div className={cn('flex flex-col items-center justify-center', className)}>
        <div>{dayNumber}</div>
        {isCurrentDay && <div className='text-xs'>오늘</div>}
      </div>
    );
  }

  return (
    <DayPicker
      locale={ko}
      showOutsideDays={showOutsideDays}
      className={cn('p-3 font-pretendard', className)}
      classNames={{
        months: 'flex flex-row h-full',
        month: 'space-y-4 w-full',
        caption: 'relative flex justify-center items-center pt-1 text-lg',
        caption_label: 'text-[2rem] font-bold',
        nav: '',
        nav_button: cn('bg-transparent p-2 opacity-50 hover:opacity-100'),
        nav_button_previous: 'absolute left-0 top-1/2 transform -translate-y-1/2',
        nav_button_next: 'absolute right-0 top-1/2 transform -translate-y-1/2',
        table: 'w-full border-collapse',
        head_row: 'flex w-full justify-between mt-8',
        head_cell: 'text-[2rem] w-full flex justify-center text-gray-800 rounded-md font-regular',
        row: 'flex mt-4',
        cell: cn('relative', 'w-[calc(100%/7)]', 'flex items-center justify-center', 'p-0.5'),
        day: cn(
          'w-full aspect-square text-[1.6rem] font-regular',
          'flex flex-col items-center justify-center',
          'focus:outline-none',
          'disabled:text-gray-400',
          'aria-selected:opacity-100 day_outside:text-gray-200',
          'rounded-[8px]',
        ),
        day_selected:
          'bg-primary text-white hover:bg-primary hover:text-secondary focus:bg-primary focus:text-secondary',
        day_today: 'bg-secondary text-black aria-selected:bg-primary aria-selected:text-white',
        day_outside: 'day-outside text-gray-200 aria-selected:bg-primary/50 aria-selected:text-secondary',
        day_disabled: 'text-gray-500 opacity-50',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className='h-6 w-6' />,
        IconRight: () => <ChevronRight className='h-6 w-6' />,
        DayContent: CustomDayContent,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export default Calendar;
