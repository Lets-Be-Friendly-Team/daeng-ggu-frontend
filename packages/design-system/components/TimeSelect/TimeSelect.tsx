interface TimeSelectProps {
  availableTimes: number[];
  selectValue: number | null;
  onSelectChange: (_value: number) => void;
}

const TimeSelect = ({ availableTimes, onSelectChange, selectValue }: TimeSelectProps) => {
  const allTimes = Array.from({ length: 12 }, (_, index) => index + 9);

  return (
    <div className='grid w-full grid-cols-4 gap-5 px-2'>
      {allTimes.map((time) => {
        const isSelected = selectValue === time;
        const isAvailable = availableTimes.includes(time);

        return (
          <button
            key={time}
            disabled={!isAvailable}
            aria-disabled={!isAvailable}
            aria-label={`${time}:00`}
            tabIndex={isAvailable ? 0 : -1}
            onClick={() => isAvailable && onSelectChange(time)}
            className={`mx-auto w-full min-w-[50px] flex-shrink-0 rounded-md border-2 border-gray-500 py-2 text-sub_h2 font-semibold ${isSelected ? 'bg-secondary text-gray-800' : 'bg-white text-gray-800'} ${isAvailable ? 'hover:bg-secondary hover:text-gray-700' : 'cursor-not-allowed opacity-50'} `}
          >
            {time}:00
          </button>
        );
      })}
    </div>
  );
};

export default TimeSelect;
