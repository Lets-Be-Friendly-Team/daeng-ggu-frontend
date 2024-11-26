import React, { useState } from 'react';

import Input, { InputValue } from '@/components/_common/Input/Input';

const MainPage = () => {
  const [val, setVal] = useState<InputValue>('');

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setVal(ev.target.value);
  };
  return (
    <div>
      <div className='text-xl font-bold'>MainPage</div>
      <div className='font-pretendard-variable text-xl'>MainPage</div>
      <div className='border border-gray-100 p-[2rem]'>
        <h1 className='text-h2'>인풋창 컴포넌트 구현</h1>
        <br />
        <Input
          // type='number'
          label='인풋 테스트'
          id='test'
          name='test'
          value={val}
          onChange={handleChange}
          placeholder='테스트 값을 입력해주세요'
        />
        <br />
        <Input width='50%' height='5rem' placeholder='label없고 크기조절한 인풋창' />
      </div>
    </div>
  );
};

export default MainPage;
