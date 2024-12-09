import { APIClient } from '@daeng-ggu/shared';
import { useMutation } from '@tanstack/react-query';

const usePostExample = () => {
  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (data: any) => {
      await APIClient.post('/daengggu/example', data);
    },
    onSuccess: () => {
      // 성공 시 실행할 코드
    },
    onSettled: () => {
      // 성공, 실패 여부와 상관없이 실행할 코드
    },
  });
};

export default usePostExample;
