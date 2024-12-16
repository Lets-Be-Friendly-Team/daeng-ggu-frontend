import React, { useState } from 'react';

import useMultipleImageUpload from '@/hooks/queries/ImageUpload/useMultipleImageUpload';
import useSingleImageUpload from '@/hooks/queries/ImageUpload/useSingleImageUpload';

/*
 * 이미지 업로드 관련 테스팅 페이지
 * '/bid/test' 에서 확인 가능함다
 * **/
const Test = () => {
  // 단일이미지에 대한 상태관리
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  // 다중 이미지에 대한 상태관리
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [multipleUploadStatus, setMultipleUploadStatus] = useState<string>('');
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[] | null>(null);

  // 단일 이미지에 대한 훅
  const singleImageUpload = useSingleImageUpload();
  // 단일 이미지에 대한 훅
  const multipleImageUpload = useMultipleImageUpload();

  // 단일 이미지 첨부관련 이벤트 핸들링
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // 단일 이미지에 대한 mutation 처리
  const handleUpload = () => {
    if (!selectedFile) {
      setUploadStatus('No file selected');
      return;
    }

    singleImageUpload.mutate(selectedFile, {
      onSuccess: (data) => {
        setUploadStatus('Upload successful');
        setUploadedImageUrl(data);
      },
      onError: (error) => {
        setUploadStatus(`Upload failed: ${error.message}`);
      },
    });
  };

  // 다중 이미지 첨부관련 이벤트 핸들링
  const handleMultipleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files));
    }
  };

  // 다중 이미지에 대한 mutation 처리
  const handleMultipleUpload = () => {
    if (selectedFiles.length === 0) {
      setMultipleUploadStatus('No files selected');
      return;
    }

    multipleImageUpload.mutate(selectedFiles, {
      onSuccess: (data) => {
        setMultipleUploadStatus('Upload successful');
        setUploadedImageUrls(data);
      },
      onError: (error) => {
        setMultipleUploadStatus(`Upload failed: ${error.message}`);
      },
    });
  };

  return (
    <div className='flex h-[300px] w-full flex-col items-center justify-center py-10'>
      {/* 단일 이미지 넣는곳 */}
      <input type='file' accept='image/*' onChange={handleFileChange} className='mb-4' />
      {/* 단일 이미지 업로드 */}
      <button
        className='mb-6 h-10 w-[100px] bg-amber-400'
        onClick={handleUpload}
        disabled={singleImageUpload.isPending} // Disable button while upload is in progress
      >
        {singleImageUpload.isPending ? 'Uploading...' : 'Upload Image'}
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

      {/* 다중 이미지 넣는곳 */}
      <input type='file' accept='image/*' multiple onChange={handleMultipleFileChange} className='mb-4' />
      <button
        className='mb-6 h-10 w-[200px] bg-amber-400'
        onClick={handleMultipleUpload}
        disabled={multipleImageUpload.isPending}
      >
        {multipleImageUpload.isPending ? 'Uploading...' : 'Upload Multiple Images'}
        {/* 다중 이미지 업로드 */}
      </button>
      {multipleUploadStatus && <p className='mt-2 text-sm'>{multipleUploadStatus}</p>}
      {uploadedImageUrls && (
        <div className='mt-4'>
          <p className='text-sm'>Uploaded Images:</p>
          <ul>
            {uploadedImageUrls.map((url, index) => (
              <li key={index}>
                <a href={url} target='_blank' rel='noopener noreferrer' className='text-blue-500 underline'>
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Test;
