// 디자이너 회원가입 (회원정보 입력)
import { SignupFormData } from '@daeng-ggu/design-system/components/SignupForm/SignupForm';
import { APIClient } from '@daeng-ggu/shared';

export interface SignupResponse {
  status: string;
  message: string;
  //   data: object;
  data: {
    desingnerId: number;
  };
}

const postSignup = async (signupForm: SignupFormData): Promise<SignupResponse> => {
  return await APIClient.post('/daengggu/designer/signup', signupForm);
  // return await APIClient.post('/daengggu/test/designer/signup', signupForm);
};

export default postSignup;
