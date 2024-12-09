import bichon from '../../assets/images/bichon.webp';
import husky from '../../assets/images/husky.webp';
import redPoodle from '../../assets/images/red-poodle.webp';
import shiba from '../../assets/images/shiba-inu.webp';
interface IDogTypeOption {
  label: string;
  image: string;
  size: string;
  gap: string;
}
interface IDogTypePickerProps {
  type?: 'radio' | 'checkbox';
  selectedValues: string[];
  // eslint-disable-next-line no-unused-vars
  onChange: (values: string[]) => void;
}
const DogTypePicker = ({ type, selectedValues, onChange }: IDogTypePickerProps) => {
  const dogOptions: IDogTypeOption[] = [
    { label: '소형견', image: redPoodle, size: 'h-[32px] w-[32px]', gap: 'gap-[14px]' },
    { label: '중형견', image: shiba, size: 'h-[32px] w-[32px]', gap: 'gap-[14px]' },
    { label: '대형견', image: husky, size: 'h-[40px] w-[40px]', gap: 'gap-[6px]' },
    { label: '특수견', image: bichon, size: 'h-[36px] w-[36px]', gap: 'gap-[10px]' },
  ];

  const handleChange = (value: string) => {
    console.log([value]);
    if (type === 'checkbox') {
      if (selectedValues.includes(value)) {
        onChange(selectedValues.filter((item) => item !== value));
      } else {
        onChange([...selectedValues, value]);
      }
    } else {
      onChange([value]);
    }
  };

  return (
    <ul className='flex w-full flex-wrap gap-2'>
      {dogOptions.map((option, index) => (
        <li key={index} className='flex-1'>
          <input
            type={type}
            name={type === 'radio' ? 'dog-type' : `dog-type-${index}`}
            id={`dog-type-${index}`}
            className='peer hidden'
            checked={selectedValues.includes(option.label)}
            onChange={() => handleChange(option.label)}
          />
          <label
            htmlFor={`dog-type-${index}`}
            className='box-border flex w-full flex-col items-center justify-center rounded-[8px] bg-gray-50 py-[2rem] text-gray-800 hover:cursor-pointer hover:bg-secondary peer-checked:border peer-checked:border-primary peer-checked:bg-secondary peer-checked:text-primary'
          >
            <div className={`flex w-full flex-col items-center justify-center ${option.gap}`}>
              <img src={option.image} alt={option.label} className={`${option.size}`} />
              <div className='text-center text-iconCaption'>{option.label}</div>
            </div>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default DogTypePicker;
