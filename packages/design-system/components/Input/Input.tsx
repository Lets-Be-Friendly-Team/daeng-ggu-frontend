/* 인풋창 컴포넌트 */
import React, { ChangeEvent } from 'react';

export type InputValue = string | number | ReadonlyArray<string>;
export type InputChangeEvent = ChangeEvent<HTMLInputElement>;

interface Props {
  label?: string;
  type?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: InputValue;
  width?: string;
  height?: string;
  onChange?: (_ev: InputChangeEvent) => void;
}

/*
 컴포넌트 사용 예시
 모든 props값은 없어도 사용가능

 <Input
 type='number'
 label='인풋 테스트'
 id='test'
 name='test'
 value={val}
 onChange={handleChange}
 placeholder='테스트 값을 입력해주세요'
/>

<Input width='50%' height='5rem' placeholder='label없고 크기조절한 인풋창' />
*/

const Input: React.FC<Props> = ({
  label = '',
  type = 'text',
  id = '',
  name = '',
  placeholder = '',
  value = '',
  width = '',
  height = '',
  onChange,
}) => {
  const changeHandler = (_ev: InputChangeEvent) => {
    if (onChange) {
      onChange(_ev);
    }
  };

  return (
    <div>
      {label && (
        <label htmlFor={id} className='mb-[0.4rem] block text-body3 font-semibold text-gray-800'>
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={changeHandler}
        style={{ width: width || '100%', height: height || 'auto' }}
        className='rounded-md bg-gray-50 px-[1.6rem] py-4 text-body3 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-gray-500'
      ></input>
    </div>
  );
};
export default Input;
