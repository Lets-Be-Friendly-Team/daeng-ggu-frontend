// import postSignup from '@/apis/signup/postSignup';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

const useSignup = (mutationOptions?: UseMutationOptions) => {
  return useMutation({
    // mutationFn: postSignup,
    ...mutationOptions,
  });
};

export default useSignup;
