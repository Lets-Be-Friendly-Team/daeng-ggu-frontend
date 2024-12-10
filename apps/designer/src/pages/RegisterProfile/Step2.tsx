import DayOffCheckBox from '@/components/DayOffCheckBox/DayOffCheckBox';

import { StepProps } from './RegisterProfileData';

const Step2 = ({ formData, setFormData }: StepProps) => {
  const handleServiceChange = (selectedItems: string[] = formData.dayOff) => {
    setFormData((prev) => ({
      ...prev,
      dayOff: selectedItems,
    }));
    console.log(selectedItems);
  };
  return (
    <div className='flex flex-col gap-y-[2.4rem]'>
      <div className='flex flex-col gap-y-[0.8rem]'>
        <div className='text-body3 font-semibold text-gray-800'>제공 서비스</div>
        <DayOffCheckBox onChange={handleServiceChange} />
      </div>
    </div>
  );
};
export default Step2;
