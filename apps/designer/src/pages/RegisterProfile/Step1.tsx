import { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';
import {
  DogTypePicker,
  Input,
  InputAddress,
  ProfileImgUploader,
  ServiceCheckBox,
  TextArea,
} from '@daeng-ggu/design-system';

import useProfileStore from '@/stores/useProfileStore';

import { Breed, DesignerData, FileData, Service } from './RegisterProfileData';
// import { ProfileData } from '@/types/designerRequestAndStatusTypes';

const Step1 = ({ setActiveBtn }: { setActiveBtn: Dispatch<SetStateAction<boolean>> }) => {
  const { profileData, setProfileData, fileData, setFileData } = useProfileStore();

  const { nickname, address1, address2, detailAddress, introduction, phone, providedServiceList } = profileData;
  const { designerImg } = fileData;

  const handleChange = (field: keyof DesignerData, value: string | File | null | Service[] | Breed[]) => {
    setProfileData({ [field]: value }); // 변경된 값만 업데이트
  };

  const handleFileChange = (field: keyof FileData, value: File | File[] | null) => {
    setFileData({ [field]: value });
  };

  const handleImageUpload = (file: File | null) => {
    setProfileData({ newImgUrl: 'new' }); // 버튼 활성화 위해서 이미지 업로드 여부만 판단
    handleFileChange('designerImg', file);
  };

  const handleImageDelete = () => {
    setProfileData({ newImgUrl: '' });
    handleFileChange('designerImg', null);
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

  // 제공 서비스 선택
  const handleServiceChange = (selectedItems: string[]) => {
    // 기존 데이터에서 선택된 항목에 없는 항목 제거
    const updatedServices = profileData.providedServiceList.filter((service) => {
      // `S1`의 경우 하위 서비스 코드를 모두 확인
      if (service.serviceCode.startsWith('S1')) {
        return selectedItems.includes('S1');
      }
      // 다른 서비스 코드 확인
      return selectedItems.includes(service.serviceCode);
    });

    // 새로 추가된 항목 처리
    selectedItems.forEach((item) => {
      if (item === 'S1') {
        // `S1`이 선택된 경우 하위 서비스 코드만 추가
        const services = [
          { serviceCode: 'S101', breedPriceTimeList: [] },
          { serviceCode: 'S102', breedPriceTimeList: [] },
          { serviceCode: 'S103', breedPriceTimeList: [] },
          { serviceCode: 'S104', breedPriceTimeList: [] },
        ];
        services.forEach((service) => {
          if (!updatedServices.some((s) => s.serviceCode === service.serviceCode)) {
            updatedServices.push(service);
          }
        });
      } else if (!profileData.providedServiceList.some((service) => service.serviceCode === item)) {
        // 다른 서비스 코드 추가
        updatedServices.push({ serviceCode: item, breedPriceTimeList: [] });
      }
    });

    // 모든 서비스의 breedList를 빈 배열로 초기화
    updatedServices.forEach((service) => {
      service.breedPriceTimeList = []; // 모든 서비스의 breedList를 빈 배열로 설정
    });

    // 최종 데이터 업데이트
    handleChange('providedServiceList', updatedServices);
  };

  // 가능 견종 선택
  const handleBreedChange = (selectedItems: string[]) => {
    // console.log('Selected items:', selectedItems);
    const updatedProvidedServiceList = providedServiceList.map((service) => ({
      ...service,
      breedPriceTimeList: selectedItems.map((breedCode) => ({
        majorBreedCode: breedCode,
        price: '', // 기본값
        time: '', // 기본값
      })),
    }));
    setProfileData({
      ...profileData,
      providedServiceList: updatedProvidedServiceList,
    });
  };

  const initialSelectedItems = () => {
    // const { providedServices } = profileData;

    // 'S1'으로 시작하는 서비스 필터링
    const hasS1Services = providedServiceList.some((service) => service.serviceCode.startsWith('S1'));

    // 나머지 서비스 필터링
    const otherServices = providedServiceList
      .filter((service) => !service.serviceCode.startsWith('S1'))
      .map((service) => service.serviceCode);

    // 'S1'으로 시작하는 서비스가 있으면 'S1' 추가
    if (hasS1Services) {
      return ['S1', ...otherServices];
    }

    return otherServices;
  };
  // useEffect(() => {
  //   console.log('Initial providedServices:', providedServices);
  // }, [providedServices]);

  // 필수 정보 입력되면 버튼 활성화
  useEffect(() => {
    // console.log(formData);
    const requiredFileds = [
      'newImgUrl',
      'nickname',
      'address1',
      'address2',
      'detailAddress',
      'phone',
      'providedServices',
    ]; //소개글은 필수 입력사항이 아님
    const fieldsToValidate = Object.keys(profileData).filter((field) =>
      requiredFileds.includes(field),
    ) as (keyof DesignerData)[];

    const isFormComplete = fieldsToValidate.every(
      (field) => {
        if (field === 'providedServiceList') {
          const premiumService = profileData.providedServiceList.filter(
            (service) => !service.serviceCode.startsWith('S1'),
          );
          console.log(premiumService);
          return premiumService?.[0]?.breedPriceTimeList.length > 0;
        } else {
          return profileData[field]?.toString().trim() !== '';
        }
      },
      // profileData[field]?.toString().trim() !== '',
    );
    setActiveBtn(isFormComplete);
  }, [profileData, setActiveBtn]);

  return (
    <div className='flex flex-col gap-y-[2.4rem]'>
      <div className='flex w-full flex-col items-center justify-center gap-[1.5rem]'>
        <ProfileImgUploader image={designerImg} handleUpload={handleImageUpload} />
        <button className='block text-caption text-gray-400' onClick={handleImageDelete}>
          프로필 사진 삭제
        </button>
      </div>
      <Input
        label='닉네임 (업체명)'
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
        <div className='text-body3 font-semibold text-gray-800'>제공 서비스 (프리미엄 서비스 제공 필수)</div>
        <ServiceCheckBox onChange={handleServiceChange} initialSelectedItems={initialSelectedItems()} />
      </div>
      {providedServiceList.filter((service) => !service.serviceCode.startsWith('S1')).length > 0 && ( // 프리미엄 서비스가 하나 이상이어야 가능 견종 선택 가능
        <div className='flex flex-col gap-y-[0.8rem]'>
          <div className='text-body3 font-semibold text-gray-800'>가능 견종</div>
          <DogTypePicker
            type='checkbox'
            selectedValues={Array.from(
              new Set(
                providedServiceList
                  .flatMap((service) => service.breedPriceTimeList?.map((breed) => breed.majorBreedCode || ''))
                  .filter((code) => code),
              ),
            )}
            onChange={handleBreedChange}
          />
        </div>
      )}
    </div>
  );
};

export default Step1;
