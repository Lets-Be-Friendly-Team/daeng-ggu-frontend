import bichon from '../../assets/images/bichon.webp';
import husky from '../../assets/images/husky.webp';
import redPoodle from '../../assets/images/red-poodle.webp';
import shiba from '../../assets/images/shiba-inu.webp';
interface IDogTypeOption {
  label: string;
  image: string;
}
interface IDogTypePickerProps {
  type?: 'radio' | 'checkbox';
  selectedValues: string[];
  // eslint-disable-next-line no-unused-vars
  onChange: (values: string[]) => void;
}
const DogTypePicker = ({ type, selectedValues, onChange }: IDogTypePickerProps) => {
  const dogOprions: IDogTypeOption[] = [
    { label: '소형견', image: redPoodle },
    { label: '중형견', image: shiba },
    { label: '대형견', image: husky },
    { label: '특수견', image: bichon },
  ];
  const handleChange = (value: string) => {
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
    <ul className='flex w-full gap-1'>
      {dogOprions.map((option, index) => (
        <li key={index} className=''>
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
            className='flex h-[80px] w-[68px] flex-col items-center justify-center rounded-[8px] bg-gray-50 py-3 text-gray-800 hover:cursor-pointer hover:bg-secondary peer-checked:border peer-checked:border-primary peer-checked:bg-secondary peer-checked:text-primary'
          >
            <div className='flex flex-col gap-3'>
              <img src={option.image} alt={option.label} className='block h-[32px] w-[32px] object-cover' />

              <div className='text-center text-iconCaption'>{option.label}</div>
            </div>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default DogTypePicker;
