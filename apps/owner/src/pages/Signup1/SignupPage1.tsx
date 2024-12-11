import { useState } from 'react';
import { useNavigate } from 'react-router';
import { SignupForm } from '@daeng-ggu/design-system';
import { SignupFormData } from '@daeng-ggu/design-system/components/SignupForm/SignupForm';

import ROUTES from '@/constants/routes';

const SignupPage = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    birth: '',
    gender: '',
    phone: '',
    nickname: '',
    address1: '',
    address2: '',
    detailAddress: '',
  });

  const navigate = useNavigate();

  //헤더의 X버튼 클릭시 처리 (추후 수정)
  const handleClose = () => {
    navigate('/login');
  };

  //데이터 전송 핸들러
  const handleSubmit = () => {
    console.log(formData);
    // alert('hi');
    navigate(ROUTES.signupSuccess);
  };

  return (
    <SignupForm
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
      userType='C'
      handleClose={handleClose}
    />
  );
};
export default SignupPage;
