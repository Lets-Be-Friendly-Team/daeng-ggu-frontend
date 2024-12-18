// src/hooks/queries/ImageUpload/useMultipleImageUpload.ts

import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';

import postMultipleImageUpload from '@/apis/imageUpload/postMultipleImageUpload';

/**
 * Custom hook to handle multiple image uploads using React Query.
 *
 * @param options - Optional mutation options for handling success and error states.
 * @returns A mutation object containing the mutate function and mutation state.
 */
const useMultipleImageUpload = (
  options?: UseMutationOptions<string[], Error, File[]>,
): UseMutationResult<string[], Error, File[]> => {
  return useMutation<string[], Error, File[]>({
    mutationFn: (files: File[]) => postMultipleImageUpload(files),
    ...options, // Spread to allow overriding or extending defaults
  });
};

export default useMultipleImageUpload;
