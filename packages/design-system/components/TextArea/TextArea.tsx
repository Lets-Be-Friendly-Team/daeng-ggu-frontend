import { ChangeEvent, FC, useEffect, useState } from 'react';

import { cn } from '../../lib/utils';

export type TextChangeEvent = ChangeEvent<HTMLTextAreaElement>;

interface Props {
  label?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  width?: string;
  height?: string;
  onChange?: (_ev: TextChangeEvent) => void;
  maxLength?: number; // 글자수 제한
  bgColor?: string; // 배경 색상
  borderWidth?: string; // 테두리 굵기
  borderColor?: string; // 테두리 색상
  className?: string;
  initialLength?: number;
}

/* 컴포넌트 사용예시
  모든 props값 없어도 사용 가능함

      <TextArea
        label='TextArea 테스트2'
        id='test'
        name='test'
        value={textVal2}
        onChange={handleText2Change}
        placeholder='테스트 값을 입력해주세요'
        height='6rem'
        maxLength={10}
        // 배경 색상 지정 가능
        bgColor='bg-white'
        // 테두리 굵기 지정 가능
        borderWidth='border-[0.5px]'
        // 테두리 색상 지정 가능
        borderColor='border-primary'
      />
*/

const TextArea: FC<Props> = ({
  label = '',
  id = '',
  name = '',
  placeholder = '',
  value = '',
  width = '',
  height = '',
  onChange,
  maxLength,
  bgColor = '',
  borderWidth = '',
  borderColor = '',
  className,
  initialLength = 0,
}) => {
  const [inputCount, setInputCount] = useState(initialLength);
  useEffect(() => {
    setInputCount(initialLength || value.length);
  }, [initialLength, value]);

  const changeHandler = (_ev: TextChangeEvent) => {
    if (onChange) {
      onChange(_ev);
      setInputCount(_ev.target.value.length);
    }
  };

  const bgClass = bgColor ? `${bgColor}` : `bg-gray-50`;
  const bwClass = borderWidth ? `${borderWidth}` : '';
  const bcClass = borderColor ? `${borderColor}` : '';

  return (
    <div className={cn('flex flex-col', className)}>
      {label && (
        <label htmlFor={id} className='mb-[0.8rem] block text-body3 font-semibold text-gray-800'>
          {label}
        </label>
      )}
      <div
        className={`${bgClass} ${bcClass} ${bwClass} rounded-md px-[1.6rem] py-5 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-gray-500`}
      >
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={changeHandler}
          maxLength={maxLength}
          style={{ width: width || '100%', height: height || '5rem' }}
          className={`${bgClass} resize-none overflow-y-auto text-body3 focus:outline-none [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar]:w-2`}
        ></textarea>
      </div>
      {maxLength && (
        <div className='ml-auto mt-[0.4rem] text-iconCaption'>
          {inputCount >= maxLength ? (
            <span className='font-semibold text-primary'>
              {inputCount}/{maxLength}자
            </span>
          ) : (
            <>
              <span className='font-semibold text-gray-800'>{inputCount}</span>
              <span className='text-gray-600'>/{maxLength}자</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default TextArea;
