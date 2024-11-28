import React, { useState } from 'react';

import { Input, SearchBar, TextArea } from '@daeng-ggu/design-system';
import { InputValue } from '@daeng-ggu/design-system/components/Input/Input';

const InputTest = () => {
  const [val, setVal] = useState<InputValue>('');
  const [textVal, setTextVal] = useState<string>('');
  const [textVal2, setTextVal2] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setVal(ev.target.value);
  };

  const handleTextChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextVal(ev.target.value);
  };

  const handleText2Change = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextVal2(ev.target.value);
  };

  const handleKeywordChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(ev.target.value);
  };
  return (
    <div className='p-8'>
      <Input
        type='number'
        label='인풋 테스트'
        id='test'
        name='test'
        value={val}
        onChange={handleChange}
        placeholder='테스트 값을 입력해주세요'
      />
      <hr className='my-4' />
      <Input width='50%' height='5rem' placeholder='label없고 크기조절한 인풋창' />
      <hr className='my-4' />
      <TextArea
        label='TextArea 테스트'
        id='test'
        name='test'
        value={textVal}
        onChange={handleTextChange}
        placeholder='테스트 값을 입력해주세요'
        height='6rem'
        maxLength={10}
      />
      <hr className='my-4' />
      <TextArea
        label='TextArea 테스트2'
        id='test'
        name='test'
        value={textVal2}
        onChange={handleText2Change}
        placeholder='테스트 값을 입력해주세요'
        height='6rem'
        maxLength={10}
        bgColor='white'
        borderWidth='0.5px'
        borderColor='primary'
      />
      <hr className='my-4' />
      <SearchBar keyword={keyword} onChange={handleKeywordChange} />
    </div>
  );
};

export default InputTest;
