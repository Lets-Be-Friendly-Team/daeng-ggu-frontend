// import DayOffCheckBox from '@/components/DayOffCheckBox/DayOffCheckBox';

// import { StepProps } from './RegisterProfileData';

// const Step2 = ({ formData, setFormData }: StepProps) => {
//   const handleServiceChange = (selectedItems: string[] = formData.dayOff) => {
//     setFormData((prev) => ({
//       ...prev,
//       dayOff: selectedItems,
//     }));
//     console.log(selectedItems);
//   };
//   return (
//     <div className='flex flex-col gap-y-[2.4rem]'>
//       <div className='flex flex-col gap-y-[0.8rem]'>
//         <div className='text-body3 font-semibold text-gray-800'>제공 서비스</div>
//         <DayOffCheckBox onChange={handleServiceChange} />
//       </div>
//     </div>
//   );
// };
// export default Step2;
import { Dispatch, SetStateAction, useEffect } from 'react';

import DayOffCheckBox from '@/components/DayOffCheckBox/DayOffCheckBox';
import PriceAndTimeList from '@/components/PriceAndTime/PriceAndTime';
import useProfileStore from '@/stores/useProfileStore';

const Step2 = ({ setActiveBtn }: { setActiveBtn: Dispatch<SetStateAction<boolean>> }) => {
  const { profileData, setProfileData } = useProfileStore();
  const { dayOff, providedServiceList } = profileData;

  const handleServiceChange = (selectedItems: string[]) => {
    setProfileData({ dayOff: selectedItems }); // dayOff 필드만 업데이트
    console.log(selectedItems);
  };

  useEffect(() => {
    const isPriceAndTimeComplete = providedServiceList.every((service) =>
      service.breedPriceTimeList.every((breed) => breed.price.length > 0 && breed.time.length > 0),
    );
    const isFormComplete = dayOff.length > 0 && isPriceAndTimeComplete;
    setActiveBtn(isFormComplete);
  }, [profileData, setActiveBtn]);

  return (
    <div className='flex flex-col gap-y-[2.4rem]'>
      <div className='flex flex-col gap-y-[0.8rem]'>
        <div className='text-body3 font-semibold text-gray-800'>휴무일</div>
        <DayOffCheckBox selectedItems={dayOff} onChange={handleServiceChange} />
      </div>
      <div className='flex flex-col'>
        <div className='text-body3 font-semibold text-gray-800'>가격 및 소요시간</div>
        <PriceAndTimeList />
      </div>
    </div>
  );
};

export default Step2;
