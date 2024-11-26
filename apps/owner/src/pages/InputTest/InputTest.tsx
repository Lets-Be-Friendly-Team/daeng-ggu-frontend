import React, { useState } from 'react';

import { Input, TextArea } from '@daeng-ggu/design-system';
import { InputValue } from '@daeng-ggu/design-system/components/Input/Input';

const InputTest = () => {
  const [val, setVal] = useState<InputValue>('');
  const [textVal, setTextVal] = useState<string>('');

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setVal(ev.target.value);
  };

  const handleTextChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextVal(ev.target.value);
  };
  return (
    <div>
      <Input
        type='number'
        label='인풋 테스트'
        id='test'
        name='test'
        value={val}
        onChange={handleChange}
        placeholder='테스트 값을 입력해주세요'
      />
      <br />
      <Input width='50%' height='5rem' placeholder='label없고 크기조절한 인풋창' />
      <TextArea
        label='인풋 테스트'
        id='test'
        name='test'
        value={textVal}
        onChange={handleTextChange}
        placeholder='테스트 값을 입력해주세요'
        maxLength={200}
      />
    </div>
  );
};

export default InputTest;
