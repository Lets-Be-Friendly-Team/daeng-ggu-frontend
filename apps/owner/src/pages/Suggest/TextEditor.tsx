import { useState } from 'react';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

const TextEditor = () => {
  const [value, setValue] = useState<string>('');

  return (
    <div className='w-full'>
      <ReactQuill theme='snow' value={value} onChange={setValue} className='editor' />
    </div>
  );
};

export default TextEditor;
