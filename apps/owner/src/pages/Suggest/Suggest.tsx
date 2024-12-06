import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BorderContainer, Calendar, Header, TimeSelect, TypeOneButton } from '@daeng-ggu/design-system';
import { format } from 'date-fns';

import TextEditor from '@/pages/Suggest/TextEditor.tsx';

import '@/styles/TextEditor.css';

const Suggest = () => {
  const location = useLocation();
  const { address, customerName, desiredDateOne, desiredDateTwo, desiredDateThree, phone } = location.state || {};

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [showTimeSelect, setShowTimeSelect] = useState(false); // State to control visibility

  const desiredDates = [desiredDateOne, desiredDateTwo, desiredDateThree]
    .filter(Boolean)
    .map((dateString) => new Date(dateString));

  const desiredDatesSet = new Set(desiredDates.map((date) => format(date, 'yyyy-MM-dd')));

  const handleDateClick = (date: Date | undefined) => {
    if (!date) return;
    const selectedDateString = format(date, 'yyyy-MM-dd');
    if (!desiredDatesSet.has(selectedDateString)) return;

    if (selectedDate && format(selectedDate, 'yyyy-MM-dd') === selectedDateString) {
      setSelectedDate(null);
      setShowTimeSelect(false);
    } else {
      setSelectedDate(date);
      setSelectedTime(null);
      setShowTimeSelect(true);
    }
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
          <div className='mb-14 h-full w-full'>
            <BorderContainer>
              <div className='w-full bg-secondary'>
                <div>
                  <div className='rounded-[8px] bg-white'>
                    <Calendar
                      mode='single'
                      selected={selectedDate || undefined}
                      onSelect={handleDateClick}
                      disabled={(date) => {
                        const dateString = format(date, 'yyyy-MM-dd');
                        return !desiredDatesSet.has(dateString);
                      }}
                    />
                  </div>
                </div>
                <div
                  className={`mt-4 overflow-hidden transition-all duration-300 ease-in-out ${
                    showTimeSelect ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className='w-full bg-secondary'>
                    <div className='flex justify-center rounded-[8px] bg-white py-4'>
                      <TimeSelect
                        availableTimes={getAvailableTimes()}
                        selectValue={selectedTime}
                        onSelectChange={handleTimeSelectChange}
                      />
                    </div>
                  </div>
                </div>
                <div className='mt-6 w-full bg-secondary'>
                  <div>
                    <div className='flex flex-col justify-center rounded-[8px] bg-white py-4 pl-6'>
                      <div className='text-sub_h2 font-bold'>가격입력</div>
                      <div className='mt-3 flex items-center text-sub_h1'>
                        <div>
                          <input className='w-full border-b focus:outline-none' placeholder='₩ 가격' type='number' />
                        </div>
                        <span className='ml-2'>원</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </BorderContainer>
          </div>

          <div className='mb-56 w-full'>
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
        <div className='fixed w-full' style={{ bottom: '65px' }}>
          <TypeOneButton text='제안하기' color='bg-secondary' onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default Suggest;
