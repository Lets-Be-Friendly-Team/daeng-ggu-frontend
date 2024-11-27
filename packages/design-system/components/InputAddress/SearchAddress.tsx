import React from 'react';
import DaumPostcode, { Address } from 'react-daum-postcode';
import getAddress from '../../utils/getAddress';
import CloseIcon from '../Icons/CloseIcon';

interface Props {
  setAddressForm: (form: { address1: string; address2: string }) => void;
  handleOpen: () => void;
}

const SearchAddress = ({ setAddressForm, handleOpen }: Props) => {
  const handleComplete = (data: Address) => {
    const address1 = `${data.sido} ${data.sigungu} ${data.bname}`; //서울시 동작구 상도동
    const address2 = getAddress(data);
    console.log(data);
    console.log(address1);

    // 선택한 주소값을 상태값으로 설정
    setAddressForm({ address1: address1, address2: address2 });

    // 팝업창 닫기
    handleOpen();
  };

  return (
    <div className='z-50 h-full w-full'>
      <div className='flex justify-between'>
        <h1>주소검색</h1>
        <div onClick={handleOpen}>
          <CloseIcon className='h-4 w-4' />
        </div>
      </div>
      <DaumPostcode onComplete={handleComplete} />
    </div>
  );
};

export default SearchAddress;
