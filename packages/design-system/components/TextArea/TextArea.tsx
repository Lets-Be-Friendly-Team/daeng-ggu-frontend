import { ChangeEvent, FC, useState } from 'react';

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
  maxLength?: number;
}
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
}) => {
  const [inputCount, setInputCount] = useState(0);
  const changeHandler = (_ev: TextChangeEvent) => {
    if (onChange) {
      onChange(_ev);
      setInputCount(_ev.target.value.length);
    }
  };

  return (
    <div className='flex flex-col'>
      {label && (
        <label htmlFor={id} className='mb-[0.4rem] block text-body3 font-semibold text-gray-800'>
          {label}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={changeHandler}
        maxLength={maxLength}
        style={{ width: width || '100%', height: height || 'auto' }}
        className='resize-none rounded-md bg-gray-50 px-[1.6rem] py-4 text-body3 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-gray-500'
      ></textarea>
      {maxLength && (
        <div className='ml-auto mt-[0.4rem] text-caption'>
          <span className='font-semibold text-gray-800'>{inputCount}</span>
          <span className='text-gray-600'>/{maxLength}자</span>
        </div>
      )}
    </div>
  );
};
export default TextArea;
