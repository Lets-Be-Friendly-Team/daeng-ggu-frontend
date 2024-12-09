import { useState } from 'react';
import { ArrowDown } from '@daeng-ggu/design-system';
import { ArrowUp } from '@daeng-ggu/design-system';

interface Option {
  code: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;

  onChange?: (_selectedCode: string) => void;
}

function SubBreedSelector({ options, placeholder = '선택해 주세요', onChange }: SelectProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleItemClick = (code: string) => {
    setSelectedCode(code);
    if (onChange) {
      onChange(code);
    }
    setIsDropdownOpen(false);
  };

  const selectedLabel = options?.find((option) => option.code === selectedCode)?.label;

  return (
    <div className='flex flex-col gap-[0.6rem]'>
      {/* Dropdown Button */}
      <div
        onClick={toggleDropdown}
        className='flex w-full cursor-pointer items-center justify-between rounded-md bg-gray-50 px-[1.6rem] py-5 text-body3 text-gray-800'
      >
        <div>{selectedLabel || placeholder}</div>
        <div className='w-auto'>
          {isDropdownOpen ? <ArrowUp className='h-4 w-4' /> : <ArrowDown className='h-4 w-4' />}
        </div>
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className='w-full'>
          <ul className='text-caption text-gray-500'>
            {options ? (
              options.map((option, index) => (
                <li key={option.code}>
                  <div
                    onClick={() => handleItemClick(option.code)}
                    className={`flex cursor-pointer items-center px-[1rem] py-[1.2rem] ${
                      selectedCode === option.code
                        ? 'bg-secondary text-primary'
                        : 'hover:bg-secondary hover:text-primary'
                    } ${index !== options.length - 1 ? 'border-b border-gray-100' : ''}`}
                  >
                    <label className='w-full cursor-pointer'>{option.label}</label>
                  </div>
                </li>
              ))
            ) : (
              <li className='px-[1rem] py-[1.2rem]'>대분류를 선택해주세요</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SubBreedSelector;
