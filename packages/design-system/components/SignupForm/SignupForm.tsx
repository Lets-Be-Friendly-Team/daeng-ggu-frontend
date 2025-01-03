import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import { Header, Input, InputAddress, PageContainer, TypeOneButton, TypeTwoButton } from '@daeng-ggu/design-system';
export type SignupFormData = {
  customerName?: string;
  designerName?: string;
  birthDate: string;
  gender: string;
  phone: string;
  nickname: string;
  address1?: string;
  address2?: string;
  detailAddress?: string;
};
interface SignupFormProps {
  formData: SignupFormData;
  setFormData: Dispatch<SetStateAction<SignupFormData>>;
  userType: 'C' | 'D';
  handleSubmit: (_e: FormEvent) => void;
  handleClose: () => void;
}

const SignupForm = ({ formData, setFormData, userType, handleSubmit, handleClose }: SignupFormProps) => {
  const [activeBtn, setActiveBtn] = useState(false);

  //입력 핸들러
  const handleChange = (_e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = _e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //문자입력 방지(숫자만 입력) 및 입력 길이 제한
  //생년월일 및 휴대폰번호 입력시 사용
  const handleNumChange = (_e: ChangeEvent<HTMLInputElement>, maxLength: number) => {
    const { name, value } = _e.target;
    const result = value.replace(/\D/g, '');
    const trimmedResult = result.slice(0, maxLength); // 최대 길이만큼 자르기
    setFormData((prev) => ({
      ...prev,
      [name]: trimmedResult,
    }));
  };

  //성별 선택 핸들러
  const handleGenderChange = (gender: string) => {
    setFormData((prev) => ({
      ...prev,
      gender: gender,
    }));
  };

  //주소 입력 핸들러
  const handleAddressChange = (address1?: string, address2?: string) => {
    setFormData((prev) => ({
      ...prev,
      address1,
      address2,
    }));
  };

  // 모든 정보 입력되면 버튼 활성화
  useEffect(() => {
    const requiredFields =
      userType === 'C'
        ? ['customerName', 'birthDate', 'gender', 'phone', 'nickname', 'address1', 'address2', 'detailAddress']
        : ['designerName', 'birthDate', 'gender', 'phone', 'nickname'];
    const isFormComplete = requiredFields.every((key) => {
      const value = formData[key as keyof SignupFormData];
      console.log(`Key: ${key}, Value: ${value}, Valid: ${value && value.trim() !== ''}`);
      return value && value.trim() !== '';
    });
    console.log('Is form complete:', isFormComplete);
    setActiveBtn(isFormComplete);
  }, [formData, userType]);

  return (
    <div className='bg-white'>
      <form onSubmit={handleSubmit}>
        <PageContainer>
          <Header mode='close' title='회원가입' onClick={handleClose} />
          <div className='mb-[6rem] flex flex-col gap-y-[2.4rem] py-[2rem]'>
            <h1 className='text-body1'>
              <strong>회원정보</strong>를 입력 해주세요
            </h1>
            {userType === 'C' ? (
              <Input
                label='이름'
                placeholder='이름 입력'
                name='customerName'
                value={formData.customerName}
                onChange={handleChange}
              />
            ) : (
              <Input
                label='이름'
                placeholder='이름 입력'
                name='designerName'
                value={formData.designerName}
                onChange={handleChange}
              />
            )}

            <Input
              label='생년월일'
              placeholder='YYYYMMDD'
              name='birthDate'
              value={formData.birthDate}
              onChange={(e) => handleNumChange(e, 8)}
            />
            <div>
              <div className='mb-[0.8rem] block text-body3 font-semibold text-gray-800'>성별</div>
              <div className='flex gap-2'>
                <TypeTwoButton
                  text='남'
                  color={formData.gender === 'M' ? 'bg-secondary' : 'bg-gray-50'}
                  fontWeight='font-medium'
                  onClick={() => handleGenderChange('M')}
                  type='button'
                />
                <TypeTwoButton
                  text='여'
                  color={formData.gender === 'F' ? 'bg-secondary' : 'bg-gray-50'}
                  onClick={() => handleGenderChange('F')}
                  fontWeight='font-medium'
                  type='button'
                />
              </div>
            </div>
            <Input
              type='tel'
              label='휴대폰'
              placeholder='숫자만 입력'
              name='phone'
              value={formData.phone}
              onChange={(e) => handleNumChange(e, 11)}
            />
            <Input
              label='닉네임'
              placeholder='닉네임 입력'
              name='nickname'
              value={formData.nickname}
              onChange={handleChange}
            />
            {userType === 'C' && (
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
            )}
          </div>
        </PageContainer>
        <TypeOneButton
          text='입력 완료'
          color={activeBtn ? 'bg-primary' : 'bg-gray-50'}
          disabled={!activeBtn}
          type='submit'
        />
      </form>
    </div>
  );
};
export default SignupForm;
