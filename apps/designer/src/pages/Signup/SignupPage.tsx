import { useState } from 'react';
import { SignupForm } from '@daeng-ggu/design-system';
import { SignupFormData } from '@daeng-ggu/design-system/components/SignupForm/SignupForm';

const SignupPage = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    birth: '',
    gender: '',
    phone: '',
    nickname: '',
  });

  //데이터 전송 핸들러
  const handleSubmit = () => {
    console.log(formData);
    alert('hi');
  };

  return <SignupForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} userType='D' />;
};
export default SignupPage;
