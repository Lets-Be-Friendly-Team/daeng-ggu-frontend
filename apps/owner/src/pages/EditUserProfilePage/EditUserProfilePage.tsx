import { useNavigate } from 'react-router';
import { Input, TypeOneButton, TypeTwoButton } from '@daeng-ggu/design-system';

import PageContainer from './../../../../../node_modules/@daeng-ggu/design-system/components/PageContainer/PageContainer';
import Header from './../../../../../packages/design-system/components/Header/Header';
// customerId		Long	보호자 아이디
// customerName		String	보호자명
// newCustomerImgFile		MultipartFile	신규 보호자 이미지 파일
// preCustomerImgUrl		String	변경전 이미지 URL
// birthDate 		String	생년월일 (YYYYMMDD)
// gender		String	성별
// phone		String	전화번호
// nickname 		String	닉네임
// address1		String	기본주소1
// address2		String	기본주소2
// detailAddress		String	상세 주소

const data = {
  customerId: 2,
  customerName: '김장미',
  newCustomerImgFile: '',
  preCustomerImgUrl: 'https://via.placeholder.com/100',
  birthDate: '19900520',
  gender: 'female',
  phone: '010-1234-5678',
  nickname: '장미',
  address1: '서울특별시',
  address2: '금천구',
  detailAddress: '',
};
const EditUserProfilePage = () => {
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate(-1);
  };
  const onClick = () => {};
  return (
    <>
      <PageContainer>
        <Header mode='back' title='프로필 수정' onClick={navigateBack} />
        <div className='flex flex-col gap-5'>
          <Input label='이름' placeholder={data.customerName} />
          <Input label='생년월일' placeholder={data.birthDate} />
          <div>
            <div className='mb-[0.4rem] block text-body3 font-semibold text-gray-800'>성별</div>
            <div className='flex gap-1'>
              <TypeTwoButton text='남' color={data.gender === 'male' ? 'bg-secondary' : ''} />
              <TypeTwoButton text='여' color={data.gender === 'female' ? 'bg-secondary' : ''} />
            </div>
          </div>
          <Input label='휴대전화' placeholder={data.phone} />
          <Input label='닉네임' placeholder={data.nickname} />
          <Input label='주소' placeholder='우편번호' />
          <Input placeholder={data.address1} />
          <Input placeholder={data.address2} />
        </div>
      </PageContainer>
      <TypeOneButton text={'저장하기'} color='bg-secondary' onClick={onClick} />
    </>
  );
};

export default EditUserProfilePage;
