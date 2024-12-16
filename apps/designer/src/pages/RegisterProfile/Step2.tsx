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
import DayOffCheckBox from '@/components/DayOffCheckBox/DayOffCheckBox';
import PriceAndTimeList from '@/components/PriceAndTime/PriceAndTime';
import useProfileStore from '@/stores/useProfileStore';

const Step2 = () => {
  const { profileData, setProfileData } = useProfileStore();

  const handleServiceChange = (selectedItems: string[]) => {
    setProfileData({ dayOff: selectedItems }); // dayOff 필드만 업데이트
    console.log(selectedItems);
  };

  return (
    <div className='flex flex-col gap-y-[2.4rem]'>
      <div className='flex flex-col gap-y-[0.8rem]'>
        <div className='text-body3 font-semibold text-gray-800'>휴무일</div>
        <DayOffCheckBox selectedItems={profileData.dayOff} onChange={handleServiceChange} />
      </div>
      <div className='flex flex-col'>
        <div className='text-body3 font-semibold text-gray-800'>가격 및 소요시간</div>
        <PriceAndTimeList />
      </div>
    </div>
  );
};

export default Step2;
