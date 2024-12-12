// // src/pages/Suggest/TextEditor.tsx
//
// import { useMemo, useRef, useState } from 'react';
// import ReactQuill from 'react-quill';
// import ImageUploader from 'quill-image-uploader';
//
// import 'react-quill/dist/quill.snow.css';
// import '@/styles/TextEditor.css';
//
// // Register the image uploader module
// ReactQuill.Quill.register('modules/imageUploader', ImageUploader);
//
// interface TextEditorProps {
//   onChange: (_content: string, _images: string[]) => void;
// }
//
// const TextEditor = ({ onChange }: TextEditorProps) => {
//   const [value, setValue] = useState<string>('');
//   const quillRef = useRef<ReactQuill | null>(null);
//
//   const uploadImage = (file: File): Promise<string> => {
//     return new Promise<string>((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => {
//         resolve(reader.result as string);
//       };
//       reader.onerror = (error) => {
//         reject(error);
//       };
//       reader.readAsDataURL(file);
//     });
//   };
//
//   const modules = useMemo(
//     () => ({
//       toolbar: [
//         [{ header: '1' }, { header: '2' }, { font: [] }],
//         [{ size: [] }],
//         ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//         [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
//         ['link', 'image', 'video'],
//         ['clean'],
//       ],
//       imageUploader: {
//         upload: uploadImage,
//       },
//     }),
//     [],
//   );
//
//   const formats = useMemo(
//     () => [
//       'header',
//       'font',
//       'size',
//       'bold',
//       'italic',
//       'underline',
//       'strike',
//       'blockquote',
//       'list',
//       'bullet',
//       'indent',
//       'link',
//       'image',
//       'video',
//     ],
//     [],
//   );
//
//   const handleChange = (content: string) => {
//     setValue(content);
//
//     try {
//       const tempDiv = document.createElement('div');
//       tempDiv.innerHTML = content;
//       const imgElements = tempDiv.getElementsByTagName('img');
//       const images: string[] = [];
//       for (let i = 0; i < imgElements.length; i++) {
//         images.push(imgElements[i].src);
//       }
//
//       onChange(content, images);
//     } catch (error) {
//       console.error('Error processing editor content:', error);
//     }
//   };
//
//   return (
//     <div className='w-full'>
//       <ReactQuill
//         ref={quillRef}
//         theme='snow'
//         value={value}
//         onChange={handleChange}
//         className='editor'
//         modules={modules}
//         formats={formats}
//       />
//     </div>
//   );
// };
//
// export default TextEditor;
