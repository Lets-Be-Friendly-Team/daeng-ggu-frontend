import { useMemo, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import ImageUploader from 'quill-image-uploader';

import 'react-quill/dist/quill.snow.css';
import '@/styles/TextEditor.css'; // Import your custom CSS

Quill.register('modules/imageUploader', ImageUploader);

const TextEditor = () => {
  const [value, setValue] = useState<string>('');
  const quillRef = useRef<ReactQuill | null>(null);

  const uploadImage = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image', 'video'],
        ['clean'],
      ],
      imageUploader: {
        upload: uploadImage, // Use the uploadImage function
      },
    }),
    [],
  );

  const formats = useMemo(
    () => [
      'header',
      'font',
      'size',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'list',
      'bullet',
      'indent',
      'link',
      'image',
      'video',
    ],
    [],
  );

  return (
    <div className='w-full'>
      <ReactQuill
        ref={quillRef}
        theme='snow'
        value={value}
        onChange={setValue}
        className='editor'
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default TextEditor;
