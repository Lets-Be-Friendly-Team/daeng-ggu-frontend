/* 주소 검색용 팝업창 (daum api 사용) */
import DaumPostcode, { Address } from 'react-daum-postcode';

// import getAddress from '../../utils/getAddress';
import CloseIcon from '../Icons/CloseIcon';

interface Props {
  setAddressForm: (_form: { address1: string; address2: string }) => void;
  handleOpen: () => void;
}

const SearchAddress = ({ setAddressForm, handleOpen }: Props) => {
  const handleComplete = (data: Address) => {
    const address1 = `${data.sido} ${data.sigungu} ${data.bname}`; //서울 강남구 대치동
    const address2 = data.address; //서울 강남구 선릉로 428
    // const address2 = getAddress(data); //서울 강남구 선릉로 428 (대치동)
    console.log(data);
    console.log(address1);
    console.log(address2);

    // 선택한 주소값을 상태값으로 설정
    setAddressForm({ address1: address1, address2: address2 });

    // 팝업창 닫기
    handleOpen();
  };

  return (
    <div className='fixed left-0 right-0 top-0 z-50 mx-auto my-0 h-full max-w-[480px]'>
      <div className='flex max-w-[480px] justify-between bg-white p-4 text-body1 text-gray-800'>
        <h1 className='semibold'>주소검색</h1>
        <div onClick={handleOpen}>
          <CloseIcon className='h-6 w-6 cursor-pointer' />
        </div>
      </div>
      <DaumPostcode onComplete={handleComplete} style={{ maxWidth: '480px', minWidth: '320px', height: '100vh' }} />
    </div>
  );
};

export default SearchAddress;
