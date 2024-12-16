import { useMutation, UseMutationResult } from '@tanstack/react-query';

import postMultipleImageUpload from '@/apis/imageUpload/postMultipleImageUpload';

const useMultipleImageUpload = (): UseMutationResult<string[], Error, File[]> => {
  return useMutation<string[], Error, File[]>({
    mutationFn: (files: File[]) => postMultipleImageUpload(files),
    onSuccess: (data: string[]) => {
      console.log('Upload successful:', data); // `data` is an array of uploaded image URLs
    },
    onError: (error: Error) => {
      console.error('Upload error:', error); // Handle errors
    },
  });
};

export default useMultipleImageUpload;
