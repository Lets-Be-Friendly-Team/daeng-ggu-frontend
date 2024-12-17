import { useMutation, UseMutationResult } from '@tanstack/react-query';

import postSingleImageUpload from '@/apis/imageUpload/postSingleImageUpload';

const useSingleImageUpload = (): UseMutationResult<string, Error, File> => {
  return useMutation<string, Error, File>({
    mutationFn: (file: File) => postSingleImageUpload(file), // Explicit mutation function
    onSuccess: (data: string) => {
      console.log('Upload successful:', data); // `data` is a string (the uploaded image URL)
    },
    onError: (error: Error) => {
      console.error('Upload error:', error); // `error` is of type `Error`
    },
  });
};

export default useSingleImageUpload;
