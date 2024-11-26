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
  // const [inputValue, setInputValue] = useState<InputValue>(value);

  const changeHandler = (_ev: InputChangeEvent) => {
    if (onChange) {
      onChange(_ev);
    }
  };

  // const widthClass = width ? `w-${width}` : `w-full`;
  // const heigthClass = height ? `h-[${height}]` : `h-auto`;
  return (
    <div>
      {label && (
        <label htmlFor={id} className='mb-[0.4rem] block text-caption font-semibold text-gray-800'>
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
        className='rounded-md bg-gray-50 px-[1.6rem] py-4 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-gray-500'
      ></input>
    </div>
  );
};
export default Input;
