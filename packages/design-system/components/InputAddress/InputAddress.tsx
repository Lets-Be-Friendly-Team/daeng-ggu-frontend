/* 주소 입력창 컴포넌트 */
import React, { useState } from 'react';

import MySearchIcon from '../Icons/MySearchIcon';
import Input from '../Input/Input';

import SearchAddress from './SearchAddress';
interface Props {
  label: string;
}

/*
컴포넌트 사용 예시
label은 안넘겨줘도 됨

<InputAddress label='주소' />
*/

const InputAddress = ({ label = '' }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [addressForm, setAddressForm] = useState({
    address1: '',
    address2: '',
  });
  const [detailAddr, setDetailAddr] = useState('');

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setDetailAddr(ev.target.value);
  };
  return (
    <div>
      {label && <label className='mb-[0.4rem] block text-body3 font-semibold text-gray-800'>{label}</label>}
      <div className='mb-[0.8rem] flex rounded-md bg-gray-50 px-[1.6rem] py-4' onClick={handleOpen}>
        <input
          className='w-full bg-gray-50 text-body3 focus:outline-none'
          placeholder='주소 검색'
          value={addressForm.address2}
        ></input>
        <MySearchIcon className='h-6 w-6' />
      </div>
      <Input placeholder='상세주소 입력' value={detailAddr} onChange={handleChange} />
      {isOpen && <SearchAddress setAddressForm={setAddressForm} handleOpen={handleOpen} />}
    </div>
  );
};

export default InputAddress;
