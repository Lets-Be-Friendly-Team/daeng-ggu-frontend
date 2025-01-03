import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { SignupForm } from '@daeng-ggu/design-system';
import { SignupFormData } from '@daeng-ggu/design-system/components/SignupForm/SignupForm';
import { useToast } from '@daeng-ggu/shared';

import ROUTES from '@/constants/routes';
import useSignup from '@/hooks/queries/Signup/useSignup';
import useOwnerIdStore from '@/stores/useOwnerIdStore';

const SignupPage = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<SignupFormData>({
    customerName: '',
    birthDate: '',
    gender: '',
    phone: '',
    nickname: '',
    address1: '',
    address2: '',
    detailAddress: '',
  });

  const navigate = useNavigate();
  const { setOwnerId } = useOwnerIdStore();
  const { mutate: signup } = useSignup({
    onSuccess: (data) => {
      //회원가입 성공시
      console.log('회원가입 성공', data);
      //로그인 처리 해주고 싶음..
      setOwnerId(data.data.customerId);
      navigate(ROUTES.signupSuccess, { state: { nickname: formData.nickname } }); //성공페이지로 이동
    },
    onError: (error) => {
      //회원가입 실패시
      showToast({ message: '회원가입에 실패했습니다!', type: 'error' });

      console.log('회원가입 실패', error);
    },
  });

  //헤더의 X버튼 클릭시 처리 (추후 수정)
  const handleClose = () => {
    navigate('/login');
  };

  //데이터 전송 핸들러
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    signup(formData);
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
