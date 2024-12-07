import { ChangeEvent, useEffect, useState } from 'react';
import { Header, Input, InputAddress, PageContainer, TypeOneButton } from '@daeng-ggu/design-system';
interface FormData {
  name: string;
  birth: string;
  phone: string;
  nickname: string;
  address1: string;
  address2: string;
  detailAddress: string;
}
const SignUpPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    birth: '',
    phone: '',
    nickname: '',
    address1: '',
    address2: '',
    detailAddress: '',
  });
  const [activeBtn, setActiveBtn] = useState(false);
  const handleChange = (_e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = _e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //생년월일 입력시 문자입력 방지 및 입력숫자 제한
  const handleBirthChange = (_e: ChangeEvent<HTMLInputElement>) => {
    // const name = _e.target.name;
    const maxLength = 8; // 최대 입력 가능 숫자 길이
    const result = _e.target.value.replace(/\D/g, '');
    const trimmedResult = result.slice(0, maxLength); // 최대 길이만큼 자르기
    setFormData((prev) => ({
      ...prev,
      birth: trimmedResult,
    }));
  };
  //휴대폰번호 입력시 문자입력 방지
  const handlePhoneChange = (_e: ChangeEvent<HTMLInputElement>) => {
    // const name = _e.target.name;
    const maxLength = 11; // 최대 입력 가능 숫자 길이
    const result = _e.target.value.replace(/\D/g, '');
    const trimmedResult = result.slice(0, maxLength); // 최대 길이만큼 자르기
    setFormData((prev) => ({
      ...prev,
      phone: trimmedResult,
    }));
  };

  const handleAddressChange = (address1: string, address2: string) => {
    setFormData((prev) => ({
      ...prev,
      address1,
      address2,
    }));
  };

  // 모든 정보 입력되면 버튼 활성화
  useEffect(() => {
    // console.log(formData);
    const isFormComplete = Object.values(formData).every((field) => field.trim() !== '');
    setActiveBtn(isFormComplete);
  }, [formData]);

  const handleSubmit = () => {
    console.log(formData);
    alert('hi');
  };

  return (
    <div className='bg-white'>
      <PageContainer>
        <Header mode='back' title='회원가입' />
        <div className='mt-8 flex flex-col gap-y-8'>
          <h1 className='text-body1'>
            <strong>회원정보</strong>를 입력 해주세요
          </h1>
          <Input label='이름' placeholder='이름 입력' name='name' value={formData.name} onChange={handleChange} />
          <Input
            label='생년월일'
            placeholder='YYYYMMDD'
            name='birth'
            value={formData.birth}
            onChange={handleBirthChange}
          />
          <Input
            type='tel'
            label='휴대폰'
            placeholder='숫자만 입력'
            name='birth'
            value={formData.phone}
            onChange={handlePhoneChange}
          />
          <Input
            label='닉네임'
            placeholder='닉네임 입력'
            name='nickname'
            value={formData.nickname}
            onChange={handleChange}
          />
          <InputAddress
            label='주소'
            addressForm={{ address1: formData.address1, address2: formData.address2 }}
            setAddressForm={({ address1, address2 }) => {
              handleAddressChange(address1, address2);
            }}
            detailAddr={formData.detailAddress}
            setDetailAddr={(value) => {
              setFormData((prev) => ({
                ...prev,
                detailAddress: value,
              }));
            }}
          />
        </div>
      </PageContainer>
      <div className='fixed bottom-[10rem] z-20 w-full'>
        <TypeOneButton
          text='입력 완료'
          color={activeBtn ? 'bg-primary' : 'bg-gray-50'}
          onClick={handleSubmit}
          disabled={activeBtn}
        />
      </div>
    </div>
  );
};
export default SignUpPage;
