import React, { useState } from 'react';
import SearchAddress from './SearchAddress';
import Input from '../Input/Input';

const InputAddress = () => {
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
      <div className='rounded-md bg-gray-50 px-[1.6rem] py-4' onClick={handleOpen}>
        <input className='w-full focus:outline-none' placeholder='주소 검색' value={addressForm.address2}></input>
      </div>
      <Input placeholder='상세주소 입력' value={detailAddr} onChange={handleChange} />
      {isOpen && <SearchAddress setAddressForm={setAddressForm} handleOpen={handleOpen} />}
    </div>
  );
};

export default InputAddress;
