import { useMutation } from '@tanstack/react-query';

import postImage from '@/apis/image/postImage';

const usePostImage = () => {
  return useMutation({
    mutationFn: (formData: FormData) => postImage(formData),
  });
};
export default usePostImage;
