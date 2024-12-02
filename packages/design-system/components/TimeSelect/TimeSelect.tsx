interface TimeSelectProps {
  availableTimes: number[];
  selectValue: number;
  onSelectChange: (_value: number) => void;
}

const TimeSelect = ({ availableTimes, onSelectChange, selectValue }: TimeSelectProps) => {
  const allTimes = Array.from({ length: 12 }, (_, index) => index + 9);

  return (
    <div className='grid grid-cols-4 gap-8 px-[2rem]'>
      {allTimes.map((time) => (
        <button
          key={time}
          disabled={!availableTimes.includes(time)}
          aria-disabled={!availableTimes.includes(time)}
          aria-label={`${time}:00`}
          tabIndex={availableTimes.includes(time) ? 0 : -1}
          onClick={() => (!availableTimes.includes(time) ? null : onSelectChange(time))}
          className={`rounded-md border-2 border-gray-800 py-[0.8rem] text-sub_h1 font-semibold hover:${selectValue === time ? 'bg-primary' : 'bg-secondary'} disabled:text-gray-200 ${selectValue === time ? 'bg-primary' : ''} `}
        >
          {time}:00
        </button>
      ))}
    </div>
  );
};

export default TimeSelect;
