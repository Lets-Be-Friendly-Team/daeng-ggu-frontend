/* 주소 입력창 컴포넌트 */
import React, { useState } from 'react';

import MySearchIcon from '../Icons/MySearchIcon';
import Input from '../Input/Input';

import SearchAddress from './SearchAddress';

export type AddressForm = {
  address1: string;
  address2: string;
};

interface Props {
  label?: string;
  addressForm: AddressForm;
  detailAddr: string;
  setAddressForm: (_form: AddressForm) => void;
  setDetailAddr: (_detail: string) => void;
}

/*
컴포넌트 사용 예시
label은 안넘겨줘도 됨

<InputAddress label='주소'
        addressForm={addressForm}
        setAddressForm={setAddressForm}
        detailAddr={detailAddr}
        setDetailAddr={setDetailAddr}
        />
*/

const InputAddress = ({
  label = '',
  addressForm = { address1: '', address2: '' },
  detailAddr = '',
  setAddressForm,
  setDetailAddr,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setDetailAddr(ev.target.value);
  };
  return (
    <div>
      {label && <label className='mb-[0.8rem] block text-body3 font-semibold text-gray-800'>{label}</label>}
      <div className='mb-[0.8rem] flex rounded-md bg-gray-50 px-[1.6rem] py-5' onClick={handleOpen}>
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
