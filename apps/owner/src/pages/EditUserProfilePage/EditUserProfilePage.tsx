import { useNavigate } from 'react-router';
import { Header, Input, PageContainer, TypeOneButton, TypeTwoButton } from '@daeng-ggu/design-system';

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
        <Header mode='back' title='내 프로필 수정' onClick={navigateBack} />
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
