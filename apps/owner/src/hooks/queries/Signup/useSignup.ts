import { SignupFormData } from '@daeng-ggu/design-system/components/SignupForm/SignupForm';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import postSignup, { SignupResponse } from '@/apis/signup/postSignup';

interface SignupError {
  message: string;
  status: number;
  code: number;
}

const useSignup = (mutationOptions?: UseMutationOptions<SignupResponse, SignupError, SignupFormData>) => {
  return useMutation({
    mutationFn: async (signupForm: SignupFormData) => await postSignup(signupForm),
    ...mutationOptions,
  });
};

export default useSignup;
