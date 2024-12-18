import { FormEvent, useState } from 'react';
// import { useNavigate } from 'react-router';
import { SignupForm } from '@daeng-ggu/design-system';
import { SignupFormData } from '@daeng-ggu/design-system/components/SignupForm/SignupForm';
// import useSignup from '@/hooks/queries/Signup/useSignup';
// import ROUTES from '@/constants/routes';

// import MembershipPayment from './MembershipPayment';

const SignupPage = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    designerName: '',
    birthDate: '',
    gender: '',
    phone: '',
    nickname: '',
  });
  // const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  // const navigate = useNavigate();
  // const { mutate: signup } = useSignup({
  //   onSuccess: (data) => {
  //     //회원가입 성공시
  //     console.log('회원가입 성공', data);
  //     navigate(ROUTES.signupSuccess, { state: { name: formData.designerName } }); //성공페이지로 이동
  //   },
  //   onError: (error) => {
  //     //회원가입 실패시
  //     console.log('회원가입 실패', error);
  //   },
  // });

  //헤더의 X버튼 클릭시 처리 (추후 수정)
  const handleClose = () => {
    // navigate('/');
    window.location.href = `${import.meta.env.VITE_DESIGNER_MAIN_URL}/login`;
  };

  //데이터 전송 핸들러
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // navigate('/membership'); //멤버십 결제 페이지로 이동
    // setIsPaymentOpen(true);
  };
  // const handlePaymentSuccess = () => {
  //   //결제 성공시 회원가입 로직 실행
  //   signup(formData);
  // };

  return (
    <>
      <SignupForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        userType='D'
        handleClose={handleClose}
      />
      {/* {isPaymentOpen && <MembershipPayment />} */}
    </>
  );
};
export default SignupPage;
