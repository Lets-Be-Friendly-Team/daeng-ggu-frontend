import { useState } from 'react';
import { useNavigate } from 'react-router';
import { SignupForm } from '@daeng-ggu/design-system';
import { SignupFormData } from '@daeng-ggu/design-system/components/SignupForm/SignupForm';

const SignupPage = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    customerName: '',
    birthDate: '',
    gender: '',
    phone: '',
    nickname: '',
  });

  const navigate = useNavigate();

  //헤더의 X버튼 클릭시 처리 (추후 수정)
  const handleClose = () => {
    navigate('/');
  };

  //데이터 전송 핸들러
  const handleSubmit = () => {
    console.log(formData);
    // alert('hi');
    navigate('/membership');
  };

  // useEffect(() => {
  //   const get = async () => {
  //     console.log(await getUserInfo());
  //   };
  //   get();
  // }, []);
  return (
    <SignupForm
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
      userType='D'
      handleClose={handleClose}
    />
  );
};
export default SignupPage;
