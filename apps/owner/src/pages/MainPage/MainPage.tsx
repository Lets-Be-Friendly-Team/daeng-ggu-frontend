import { useState } from 'react';
import { DogTypePicker } from '@daeng-ggu/design-system';

const MainPage = () => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  return (
    <div>
      <div className='text-xl font-bold'>MainPagee</div>

      <div className='font-pretendard-variable text-xl'></div>
      <DogTypePicker
        type='checkbox'
        selectedValues={selectedValues}
        onChange={(_values) => setSelectedValues(_values)}
      />
    </div>
  );
};

export default MainPage;
