import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useSingleImageUpload from '@/hooks/queries/ImageUpload/useSingleImageUpload';

const Test = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const { mutate, isPending, isSuccess, data, isError, error } = useSingleImageUpload();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setUploadStatus('No file selected');
      return;
    }

    // Trigger the mutation
    mutate(selectedFile);
  };

  // Use React Query's mutation states to update the UI dynamically
  useEffect(() => {
    if (isSuccess && data) {
      setUploadStatus('Upload successful');
      setUploadedImageUrl(data);
    }

    if (isError && error instanceof Error) {
      setUploadStatus(`Upload failed: ${error.message}`);
    }
  }, [isSuccess, data, isError, error]);

  return (
    <div className='flex h-[300px] w-full flex-col items-center justify-center py-10'>
      <input type='file' accept='image/*' onChange={handleFileChange} className='mb-4' />
      <button
        className='mb-6 h-10 w-[100px] bg-amber-400'
        onClick={handleUpload}
        disabled={isPending} // Disable button while the upload is in progress
      >
        {isPending ? 'Uploading...' : 'Upload Image'}
      </button>
      {uploadStatus && <p className='mt-2 text-sm'>{uploadStatus}</p>}
      {uploadedImageUrl && (
        <div className='mt-4'>
          <p className='text-sm'>Uploaded Image URL:</p>
          <a href={uploadedImageUrl} target='_blank' rel='noopener noreferrer' className='text-blue-500 underline'>
            {uploadedImageUrl}
          </a>
        </div>
      )}
      <button
        className='mb-6 h-10 w-[100px] bg-amber-400'
        onClick={() => navigate('request', { state: { from: '/test' } })}
      >
        Go to Request
      </button>
      <button
        className='h-10 w-[100px] bg-amber-400'
        onClick={() => navigate('/bid/designer', { state: { from: '/bid/designer' } })}
      >
        Go to designer mode
      </button>
    </div>
  );
};

export default Test;
