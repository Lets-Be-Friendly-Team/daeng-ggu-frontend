import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BorderContainer, Calendar, Header, TimeSelect } from '@daeng-ggu/design-system';
import { format } from 'date-fns';

import TextEditor from '@/pages/Suggest/TextEditor.tsx';

import '@/styles/TextEditor.css';

const Suggest = () => {
  const location = useLocation();
  const { address, customerName, desiredDateOne, desiredDateTwo, desiredDateThree, phone } = location.state || {};

  console.log(desiredDateOne, desiredDateTwo, desiredDateThree);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);

  // Parse desired dates into Date objects
  const desiredDates = [desiredDateOne, desiredDateTwo, desiredDateThree]
    .filter(Boolean)
    .map((dateString) => new Date(dateString));

  // Extract unique dates (without time)
  const desiredDatesSet = new Set(desiredDates.map((date) => format(date, 'yyyy-MM-dd')));

  // Handle date selection
  const handleDateClick = (date: Date | undefined) => {
    if (!date) return;
    const selectedDateString = format(date, 'yyyy-MM-dd');
    if (!desiredDatesSet.has(selectedDateString)) return; // Ignore dates that are not desired

    setSelectedDate(date);
    setSelectedTime(null); // Reset selected time when date changes
  };

  // Handle time selection
  const handleTimeSelectChange = (time: number) => {
    setSelectedTime(time);
    console.log('Selected Date:', selectedDate ? format(selectedDate, 'yyyy-MM-dd') : 'No date selected');
    console.log('Selected Time:', time);
  };

  // Get available times for selected date
  const getAvailableTimes = () => {
    if (!selectedDate) return [];
    const selectedDateString = format(selectedDate, 'yyyy-MM-dd');

    return desiredDates
      .filter((date) => format(date, 'yyyy-MM-dd') === selectedDateString)
      .map((date) => date.getHours());
  };

  return (
    <div>
      <div className='mb-6 max-w-[480px]'>
        <Header mode='back' title='견적 제안하기' />
        <div className='mt-10 px-[20px]'>
          <div className='items-start'>
            <h2 className='mb-4 text-h3 font-bold text-gray-800'>제안서 상세</h2>
          </div>
          <div className='mb-16 w-full'>
            <BorderContainer innerPadding='p-3'>
              <TextEditor />
            </BorderContainer>
          </div>
          <div className='items-start'>
            <h2 className='mb-4 text-h3 font-bold text-gray-800'>견적서 설정</h2>
          </div>
          <div className='mb-40 h-full w-full'>
            <BorderContainer innerPadding='p-3'>
              <Calendar
                mode='single'
                selected={selectedDate || undefined}
                onSelect={handleDateClick}
                disabled={(date) => {
                  const dateString = format(date, 'yyyy-MM-dd');
                  return !desiredDatesSet.has(dateString);
                }}
              />
            </BorderContainer>
            {selectedDate && (
              <div className='mt-4'>
                <TimeSelect
                  availableTimes={getAvailableTimes()}
                  selectValue={selectedTime}
                  onSelectChange={handleTimeSelectChange}
                />
              </div>
            )}
          </div>
          <div className='mb-52 w-full'>
            <div className='mt-6 items-start'>
              <h2 className='mb-4 text-h3 font-bold text-gray-800'>댕송지 정보</h2>
            </div>
            <BorderContainer innerPadding='p-3'>
              <div className='flex-col items-start p-2 text-gray-800'>
                <p className='text-sub_h2 font-bold'>{customerName || '정보 없음'}</p>
                <p className='text-body3 font-bold text-gray-800'>{phone || '정보 없음'}</p>
                <p className='pt-1 text-caption'>{address || '정보 없음'}</p>
              </div>
            </BorderContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suggest;
