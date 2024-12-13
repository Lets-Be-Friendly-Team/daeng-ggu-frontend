// 보호자 회원가입 (회원정보 입력)
import { SignupFormData } from '@daeng-ggu/design-system/components/SignupForm/SignupForm';
import { APIClient } from '@daeng-ggu/shared';

export interface SignupResponse {
  data: string;
  status: string;
  message: string;
}

const postSignup = async (signupForm: SignupFormData): Promise<SignupResponse> => {
  return await APIClient.post<SignupResponse>('/daengggu/customer/signup', signupForm);
};

export default postSignup;
