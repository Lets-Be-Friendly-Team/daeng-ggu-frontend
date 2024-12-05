import { useMemo, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import ImageUploader from 'quill-image-uploader';

import 'react-quill/dist/quill.snow.css';

Quill.register('modules/imageUploader', ImageUploader);

const TextEditor = () => {
  const [value, setValue] = useState<string>('');

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
        upload: (file: File) => {
          return new Promise((resolve, reject) => {
            // Replace this with your actual upload logic
            const reader = new FileReader();
            reader.onload = () => {
              resolve(reader.result as string);
            };
            reader.onerror = (error) => {
              reject(error);
            };
            reader.readAsDataURL(file);
          });
        },
      },
    }),
    [], // Empty dependency array ensures this object is only created once
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
    [], // Empty dependency array ensures this array is only created once
  );

  return (
    <div className='w-full'>
      <ReactQuill
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
