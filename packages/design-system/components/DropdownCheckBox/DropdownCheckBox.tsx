import { useState } from 'react';

import ArrowDown from '../Icons/ArrowDown';
import ArrowUp from '../Icons/ArrowUp';
import CheckedIcon from '../Icons/CheckedIcon';
import UncheckedIcon from '../Icons/UncheckedIcon';

type option = { id: string; label: string };

interface CheckBoxProps {
  // eslint-disable-next-line no-unused-vars
  onChange?: (selectedItems: string[]) => void;
  placeholder?: string;
  options: option[];
}

function DropdownCheckBox({ onChange, placeholder, options }: CheckBoxProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});

  //   const options = [
  //     { id: 'service1', label: '기본 서비스 (미용, 목욕)' },
  //     { id: 'service2', label: '프리미엄 - 스파' },
  //     { id: 'service3', label: '프리미엄 - 풀케어' },
  //     { id: 'service4', label: '프리미엄 - 모니터링' },
  //   ];

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleItemClick = (id: string) => {
    setSelectedItems((prev) => {
      const newState = { ...prev, [id]: !prev[id] };
      if (onChange) {
        const selectedIds = Object.keys(newState).filter((key) => newState[key]);
        onChange(selectedIds);
      }
      return newState;
    });
  };

  const selectedLabels = Object.keys(selectedItems)
    .filter((key) => selectedItems[key])
    .map((key) => {
      const option = options.find((opt) => opt.id === key);
      if (option?.id === 'S1') {
        return '기본';
      }
      return option?.label.split(' - ')[1] || option?.label;
    })
    .join('/');

  return (
    <div className='flex flex-col gap-[6px]'>
      <div
        onClick={toggleDropdown}
        className='flex w-full cursor-pointer items-center justify-between rounded-md bg-gray-50 px-[1.6rem] py-5 text-body3'
      >
        {selectedLabels ? (
          <p className='text-gray-800'>{selectedLabels}</p>
        ) : placeholder ? (
          <p className='text-gray-400'>{placeholder}</p>
        ) : (
          <p className='text-gray-400'>선택하세요</p>
        )}
        <div className='w-auto'>
          {isDropdownOpen ? <ArrowUp className='h-4 w-4' /> : <ArrowDown className='h-4 w-4' />}
        </div>
      </div>

      {isDropdownOpen && (
        <div className='w-full rounded-lg'>
          <ul className='text-caption text-gray-500'>
            {options.map((option, index) => (
              <li key={option.id}>
                <div
                  onClick={() => handleItemClick(option.id)}
                  className={`flex cursor-pointer items-center px-[1rem] py-[1.2rem] ${
                    selectedItems[option.id] ? 'bg-secondary text-primary' : 'hover:bg-secondary hover:text-primary'
                  } ${index !== options.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  <div className='flex h-4 w-4 items-center justify-center'>
                    {selectedItems[option.id] ? (
                      <CheckedIcon className='h-4 w-4 text-primary' />
                    ) : (
                      <UncheckedIcon className='h-4 w-4' />
                    )}
                  </div>
                  <label className='ms-2 w-full cursor-pointer'>{option.label}</label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DropdownCheckBox;
