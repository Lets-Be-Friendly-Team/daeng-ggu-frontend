/* 주소 입력창 테스트 페이지 */
import { useState } from 'react';
import { InputAddress } from '@daeng-ggu/design-system';

const AddressTest = () => {
  const [addressForm, setAddressForm] = useState({
    address1: '',
    address2: '',
  });
  const [detailAddr, setDetailAddr] = useState('');

  return (
    <div className='p-8'>
      <InputAddress
        label='주소'
        addressForm={addressForm}
        setAddressForm={setAddressForm}
        detailAddr={detailAddr}
        setDetailAddr={setDetailAddr}
      />
    </div>
  );
};

export default AddressTest;
