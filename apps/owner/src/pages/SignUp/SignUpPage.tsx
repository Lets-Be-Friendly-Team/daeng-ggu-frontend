import { ChangeEvent, useState } from 'react';
import { Header, Input, PageContainer } from '@daeng-ggu/design-system';
interface FormData {
  name: string;
  birth: string;
}
const SignUpPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    birth: '',
  });
  const handleChange = (_e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = _e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
          <Input label='생년월일' placeholder='YYYYMMDD' name='birth' value={formData.birth} onChange={handleChange} />
          <Input
            type='tel'
            label='휴대폰'
            placeholder='숫자만 입력'
            name='birth'
            value={formData.birth}
            onChange={handleChange}
          />
        </div>
      </PageContainer>
    </div>
  );
};
export default SignUpPage;
