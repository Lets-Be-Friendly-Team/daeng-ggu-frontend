import { FC, ChangeEvent } from 'react';

import MySearchIcon from '../Icons/MySearchIcon';

export type InputChangeEvent = ChangeEvent<HTMLInputElement>;

interface Props {
  name?: string;
  placeholder?: string;
  keyword?: string;
  width?: string;
  height?: string;
  onChange?: (_ev: InputChangeEvent) => void;
}

const SearchBar: FC<Props> = ({ name = '', placeholder = '', keyword = '', width = '', height = '', onChange }) => {
  const changeHandler = (_ev: InputChangeEvent) => {
    if (onChange) {
      onChange(_ev);
    }
  };
  return (
    <div className='flex w-full gap-4 rounded-lg border-[0.5px] border-gray-100 bg-white px-8 py-4 drop-shadow-md'>
      <MySearchIcon />
      <input
        name={name}
        placeholder={placeholder}
        value={keyword}
        onChange={changeHandler}
        style={{ width: width || '100%', height: height || 'auto' }}
        className='text-body3 focus:outline-none'
      ></input>
    </div>
  );
};

export default SearchBar;
