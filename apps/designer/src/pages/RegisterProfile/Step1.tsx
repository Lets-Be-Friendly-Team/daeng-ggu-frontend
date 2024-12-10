// import { ChangeEvent, useState } from 'react';
// import {
//   DogTypePicker,
//   Input,
//   InputAddress,
//   ProfileImgUploader,
//   ServiceCheckBox,
//   TextArea,
// } from '@daeng-ggu/design-system';
// import { TextChangeEvent } from '@daeng-ggu/design-system/components/TextArea/TextArea';

// import { breedList, DesignerData, StepProps } from './RegisterProfileData';
// import useProfileStore from '@/stores/useProfileStore';

// const Step1 = ({ formData, setFormData }: StepProps) => {
//   const { profileData, setProfileData } = useProfileStore();
//   const handleChange = (field: keyof DesignerData, value: any) => {
//     setProfileData({ [field]: value }); // 변경된 값만 업데이트
//   };

//   const {
//     designerImg,
//     nickname,
//     address1,
//     address2,
//     detailAddress,
//     introduction,
//     phone,
//     // providedServices,
//     // possibleBreeds,
//   } = formData;

//   const handleImageUpload = (file: File | null) => {
//     if (file) {
//       setFormData((prev) => ({
//         ...prev,
//         designerImg: file,
//       }));
//     }
//   };

//   const handleImageDelete = () => {
//     setFormData((prev) => ({ ...prev, designerImg: null }));
//     // setFormData((prev) => ({ ...prev, prePetImgUrl: '' }));
//   };

//   //입력 핸들러
//   // const handleChange = (_e: ChangeEvent<HTMLInputElement> | TextChangeEvent) => {
//   //   const { name, value } = _e.target;
//   //   setFormData((prev) => ({
//   //     ...prev,
//   //     [name]: value,
//   //   }));
//   // };
//   //주소 입력 핸들러
//   const handleAddressChange = (address1?: string, address2?: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       address1,
//       address2,
//     }));
//   };
//   //문자입력 방지(숫자만 입력)
//   //연락처 입력시 사용
//   const handleNumChange = (_e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = _e.target;
//     const result = value.replace(/\D/g, '');
//     setFormData((prev) => ({
//       ...prev,
//       [name]: result,
//     }));
//   };

//   const handleServiceChange = (selectedItems: string[]) => {
//     // setFormData((prev)=>({
//     //     ...prev,
//     //     providedServices:selectedItems //얘를 string[] type으로 바꾸는게 좋을듯
//     // }))
//     console.log(selectedItems);
//     const providedServices = selectedItems.map((item) => ({ servicesCode: item, codeDesc: item }));
//     setFormData((prev) => ({
//       ...prev,
//       providedServices: providedServices,
//     }));
//   };

//   const [selectedBreed, setSelectedBreed] = useState<string[]>([]);
//   const handleBreedChange = (selectedItems: string[]) => {
//     // setFormData((prev)=>({
//     //     ...prev,
//     //     providedServices:selectedItems //얘를 string[] type으로 바꾸는게 좋을듯
//     // }))
//     console.log(selectedItems);
//     setSelectedBreed(selectedItems);
//     const possibleBreeds = selectedItems.map((item) => ({ breedCode: breedList[item].code, codeDesc: item }));
//     setFormData((prev) => ({
//       ...prev,
//       possibleBreeds: possibleBreeds,
//     }));
//   };

//   return (
//     <div className='flex flex-col gap-y-[2.4rem]'>
//       <div className='flex  w-full flex-col items-center justify-center gap-[1.5rem]'>
//         <ProfileImgUploader image={designerImg} handleUpload={handleImageUpload} />
//         <button className='block text-caption text-gray-400' onClick={handleImageDelete}>
//           프로필 사진 삭제
//         </button>
//       </div>
//       <Input
//         label='닉네임(업체명)'
//         placeholder='닉네임 및 업체명 입력'
//         name='nickname'
//         value={nickname}
//         onChange={handleChange}
//       />
//       <InputAddress
//         label='주소'
//         addressForm={{ address1: address1, address2: address2 }}
//         setAddressForm={({ address1, address2 }) => {
//           handleAddressChange(address1, address2);
//         }}
//         detailAddr={detailAddress}
//         setDetailAddr={(value) => {
//           setFormData((prev) => ({
//             ...prev,
//             detailAddress: value,
//           }));
//         }}
//       />
//       <TextArea
//         label='소개'
//         placeholder='소개글 입력'
//         maxLength={200}
//         name='introduction'
//         value={introduction}
//         onChange={handleChange}
//       />
//       <Input label='연락처' placeholder='숫자만 입력' value={phone} name='phone' onChange={(e) => handleNumChange(e)} />
//       <div className='flex flex-col gap-y-[0.8rem]'>
//         <div className='text-body3 font-semibold text-gray-800'>제공 서비스</div>
//         <ServiceCheckBox onChange={handleServiceChange} />
//       </div>
//       <div className='flex flex-col gap-y-[0.8rem]'>
//         <div className='text-body3 font-semibold text-gray-800'>가능 견종</div>
//         <DogTypePicker type='checkbox' selectedValues={selectedBreed} onChange={handleBreedChange} />
//       </div>
//     </div>
//   );
// };
// export default Step1;

import { ChangeEvent } from 'react';
import {
  DogTypePicker,
  Input,
  InputAddress,
  ProfileImgUploader,
  ServiceCheckBox,
  TextArea,
} from '@daeng-ggu/design-system';

import useProfileStore from '@/stores/useProfileStore';

import { breedList, DesignerData, Service } from './RegisterProfileData';

const Step1 = () => {
  const { profileData, setProfileData } = useProfileStore();

  const handleChange = (
    field: keyof DesignerData,
    value: string | File | null | Service[] | { breedCode: string; codeDesc: string }[],
  ) => {
    setProfileData({ [field]: value }); // 변경된 값만 업데이트
  };

  const handleImageUpload = (file: File | null) => {
    handleChange('designerImg', file);
  };

  const handleImageDelete = () => {
    handleChange('designerImg', null);
  };

  const handleAddressChange = (address1?: string, address2?: string) => {
    setProfileData({
      address1,
      address2,
    });
  };

  const handleNumChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D/g, ''); // 숫자만 허용
    handleChange(name as keyof DesignerData, numericValue);
  };

  const handleServiceChange = (selectedItems: string[]) => {
    const providedServices = selectedItems.map((item) => ({
      servicesCode: item,
      codeDesc: item,
    }));
    handleChange('providedServices', providedServices);
  };

  const handleBreedChange = (selectedItems: string[]) => {
    const possibleBreeds = selectedItems.map((item) => ({
      breedCode: breedList[item].code,
      codeDesc: item,
    }));
    handleChange('possibleBreeds', possibleBreeds);
  };

  const { designerImg, nickname, address1, address2, detailAddress, introduction, phone } = profileData;

  return (
    <div className='flex flex-col gap-y-[2.4rem]'>
      <div className='flex w-full flex-col items-center justify-center gap-[1.5rem]'>
        <ProfileImgUploader image={designerImg} handleUpload={handleImageUpload} />
        <button className='block text-caption text-gray-400' onClick={handleImageDelete}>
          프로필 사진 삭제
        </button>
      </div>
      <Input
        label='닉네임(업체명)'
        placeholder='닉네임 및 업체명 입력'
        name='nickname'
        value={nickname}
        onChange={(e) => handleChange('nickname', e.target.value)}
      />
      <InputAddress
        label='주소'
        addressForm={{ address1: address1, address2: address2 }}
        setAddressForm={({ address1, address2 }) => {
          handleAddressChange(address1, address2);
        }}
        detailAddr={detailAddress}
        setDetailAddr={(value) => handleChange('detailAddress', value)}
      />
      <TextArea
        label='소개'
        placeholder='소개글 입력'
        maxLength={200}
        name='introduction'
        value={introduction}
        onChange={(e) => handleChange('introduction', e.target.value)}
      />
      <Input label='연락처' placeholder='숫자만 입력' value={phone} name='phone' onChange={handleNumChange} />
      <div className='flex flex-col gap-y-[0.8rem]'>
        <div className='text-body3 font-semibold text-gray-800'>제공 서비스</div>
        <ServiceCheckBox onChange={handleServiceChange} />
      </div>
      <div className='flex flex-col gap-y-[0.8rem]'>
        <div className='text-body3 font-semibold text-gray-800'>가능 견종</div>
        <DogTypePicker
          type='checkbox'
          selectedValues={profileData.possibleBreeds.map((b) => b.codeDesc)}
          onChange={handleBreedChange}
        />
      </div>
    </div>
  );
};

export default Step1;
