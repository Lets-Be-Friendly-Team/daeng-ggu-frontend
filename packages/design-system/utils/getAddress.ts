import { Address } from 'react-daum-postcode';

const getAddress = (data: Address) => {
  let extraAddress = '';
  let address = data.address;

  if (data.addressType === 'R') {
    if (data.bname !== '') {
      extraAddress += data.bname;
    }
    if (data.buildingName !== '') {
      extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
    }
    address += extraAddress !== '' ? ` (${extraAddress})` : '';
  }
  return address;
};

export default getAddress;
