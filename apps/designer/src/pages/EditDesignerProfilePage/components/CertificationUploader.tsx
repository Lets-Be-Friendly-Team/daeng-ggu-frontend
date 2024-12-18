import { Dispatch, SetStateAction } from 'react';
import { CloseIcon } from '@daeng-ggu/design-system';
import CameraIcon from '@daeng-ggu/design-system/components/Icons/CameraIcon';

interface IFormDataType {
  designerId: number;
  designerName: string;
  nickname: string;
  preImgUrl: string;
  address1: string;
  address2: string;
  detailAddress: string;
  introduction: string;
  phone: string;
  businessNumber: string;
  preCertifications: string[];
  workExperience: string;
}

interface ICertificationUploaderProps {
  formData: { preCertifications: string[] };
  setFormData: Dispatch<SetStateAction<IFormDataType>>;
  setNewCertifications: Dispatch<SetStateAction<File[]>>;
}
const CertificationUploader = ({ formData, setFormData, setNewCertifications }: ICertificationUploaderProps) => {
  const { preCertifications } = formData;
  return (
    <div className='flex flex-col gap-1'>
      <div className='block text-body3 font-semibold text-gray-800'>서류 등록 (사업자 등록증 및 애견 미용 자격증)</div>
      <div className='text-gray-700 text-iconCaption'>~MB 이하의 jpg, png 파일 3개까지 업로드 가능합니다.</div>
      <div className='flex flex-wrap gap-3'>
        {preCertifications.map((cert, index) => (
          <div key={index} className='relative h-[100px] w-[100px] rounded-md overflow-hidden'>
            <img src={cert} alt={`certification-${index}`} className='h-full w-full object-cover' />
            <div className='absolute top-0 rounded-b-md left-0 w-full bg-gradient-to-b from-gray-700 to-transparent py-4'>
              <button
                onClick={() => {
                  const updatedCerts = preCertifications.filter((_, i) => i !== index);
                  setFormData((prev) => ({
                    ...prev,
                    preCertifications: updatedCerts,
                  }));
                }}
                className='absolute top-1 right-1 flex items-center justify-center'
              >
                <CloseIcon className='w-[15px] h-[15px] stroke-gray-50' />
              </button>
            </div>
          </div>
        ))}

        <label
          htmlFor='upload-image'
          className='flex h-[100px] w-[100px] items-center justify-center rounded-md bg-gray-50 hover:cursor-pointer'
        >
          <CameraIcon className='w-[24px] h-[24px]' isCircle={false} color='#C2C7CD' />
          <input
            id='upload-image'
            type='file'
            accept='image/jpeg, image/png'
            className='hidden'
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setNewCertifications((prev) => [...prev, file]);
                const reader = new FileReader();
                reader.onload = () => {
                  if (reader.result) {
                    setFormData((prev) => ({
                      ...prev,
                      preCertifications: [...prev.preCertifications, reader.result as string],
                    }));
                  }
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </label>
      </div>
    </div>
  );
};
export default CertificationUploader;
