import { useState } from 'react';

import ArrowDown from '../Icons/ArrowDown';
import ArrowUp from '../Icons/ArrowUp';

function ServiceCheckBox() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <>
      <div
        onClick={toggleDropdown}
        className='flex h-[36px] w-[280px] items-center justify-between rounded-[8px] bg-gray-50 px-4 text-center text-body3 text-gray-800'
      >
        <div>기본/스파/풀케어</div>
        <div className='w-auto'>
          {isDropdownOpen ? <ArrowUp className={'h-4 w-4'} /> : <ArrowDown className={'h-4 w-4'} />}
        </div>
      </div>

      <div id='dropdownSearch' className={`z-10 w-[280px] rounded-lg bg-white ${isDropdownOpen ? '' : 'hidden'}`}>
        <ul className='h-48 overflow-y-auto text-caption text-gray-500'>
          <li>
            <div className='flex items-center rounded p-2 hover:bg-gray-100'>
              <input id='checkbox-item-11' type='checkbox' className='h-4 w-4 rounded border-gray-300 bg-gray-100' />
              <label htmlFor='checkbox-item-11' className='ms-2 w-full rounded'>
                기본 서비스 (미용, 목욕)
              </label>
            </div>
          </li>
          <li>
            <div className='flex items-center rounded p-2 hover:bg-gray-100'>
              <input id='checkbox-item-11' type='checkbox' className='h-4 w-4 rounded border-gray-300 bg-gray-100' />
              <label htmlFor='checkbox-item-11' className='ms-2 w-full rounded'>
                프리미엄 - 스파
              </label>
            </div>
          </li>
          <li>
            <div className='flex items-center rounded p-2 hover:bg-gray-100'>
              <input id='checkbox-item-11' type='checkbox' className='h-4 w-4 rounded border-gray-300 bg-gray-100' />
              <label htmlFor='checkbox-item-11' className='ms-2 w-full rounded'>
                프리미엄 - 풀케어
              </label>
            </div>
          </li>
          <li>
            <div className='flex items-center rounded p-2 hover:bg-gray-100'>
              <input id='checkbox-item-11' type='checkbox' className='h-4 w-4 rounded border-gray-300 bg-gray-100' />
              <label htmlFor='checkbox-item-11' className='ms-2 w-full rounded'>
                프리미엄 - 모니터링
              </label>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default ServiceCheckBox;
