/* eslint-disable */

declare module 'quill-image-uploader' {
  import { Quill } from 'quill';

  interface ImageUploaderOptions {
    upload: (file: File) => Promise<string>;
  }
  const ImageUploader: {
    new (quill: Quill, options: ImageUploaderOptions): void;
  };
  export default ImageUploader;
}
