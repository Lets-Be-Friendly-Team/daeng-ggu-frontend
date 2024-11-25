// RegionSelector.tsx
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import areasData from '@/data/areas.json';

interface Area {
  name: string;
  subArea: string[];
}

interface RegionSelectorProps {
  onSelectionChange?: (_selection: { area: string; subArea: string }) => void;
}

const areas: Area[] = areasData;

const RegionSelector: React.FC<RegionSelectorProps> = ({ onSelectionChange }) => {
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [selectedSubArea, setSelectedSubArea] = useState<string>('');
  const [isAreaOpen, setIsAreaOpen] = useState<boolean>(false);
  const [isSubAreaOpen, setIsSubAreaOpen] = useState<boolean>(false);

  const areaRef = useRef<HTMLDivElement>(null);
  const subAreaRef = useRef<HTMLDivElement>(null);

  const handleAreaChange = useCallback((area: string) => {
    setSelectedArea(area);
    setSelectedSubArea('');
    setIsAreaOpen(false);
    // Do not call onSelectionChange here to maintain original logic
  }, []);

  const handleSubAreaChange = useCallback(
    (subArea: string) => {
      setSelectedSubArea(subArea);
      setIsSubAreaOpen(false);
      if (onSelectionChange && selectedArea && subArea) {
        onSelectionChange({ area: selectedArea, subArea });
      }
    },
    [onSelectionChange, selectedArea],
  );

  const subAreas = useMemo(() => {
    return areas.find((area) => area.name === selectedArea)?.subArea || [];
  }, [selectedArea]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (areaRef.current && !areaRef.current.contains(event.target as Node)) {
        setIsAreaOpen(false);
      }
      if (subAreaRef.current && !subAreaRef.current.contains(event.target as Node)) {
        setIsSubAreaOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      {/* Area Selector */}
      <div className='w-[260px]' ref={areaRef}>
        <button
          type='button'
          onClick={() => setIsAreaOpen((prev) => !prev)}
          className='flex h-[48px] w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          <span>{selectedArea || '지역을 선택해주세요'}</span>
          <svg
            className={`h-5 w-5 transition-transform duration-200 ${isAreaOpen ? 'rotate-180 transform' : ''}`}
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
          </svg>
        </button>

        {isAreaOpen && (
          <ul className='absolute z-10 mt-1 max-h-60 w-[260px] overflow-auto rounded-lg border border-gray-300 bg-white shadow-lg'>
            {areas.map((area) => (
              <li key={area.name}>
                <button
                  type='button'
                  onClick={() => handleAreaChange(area.name)}
                  className={`flex w-full items-center px-4 py-2 text-left hover:bg-blue-100 ${
                    selectedArea === area.name ? 'bg-blue-100' : ''
                  }`}
                >
                  <span
                    className={`mr-3 inline-block h-4 w-4 rounded-full border-2 ${
                      selectedArea === area.name ? 'border-blue-600 bg-blue-600' : 'border-gray-400'
                    }`}
                  ></span>
                  {area.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* SubArea Selector */}
      {selectedArea && (
        <div className='relative' ref={subAreaRef}>
          <button
            type='button'
            onClick={() => setIsSubAreaOpen((prev) => !prev)}
            className='flex h-[48px] w-[260px] items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500'
          >
            <span>{selectedSubArea || '시,군,구를 선택해주세요'}</span>
            <svg
              className={`h-5 w-5 transition-transform duration-200 ${isSubAreaOpen ? 'rotate-180 transform' : ''}`}
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
            </svg>
          </button>

          {isSubAreaOpen && (
            <ul className='absolute z-10 mt-1 max-h-60 w-[260px] overflow-auto rounded-lg border border-gray-300 bg-white shadow-lg'>
              {subAreas.map((subArea) => (
                <li key={subArea}>
                  <button
                    type='button'
                    onClick={() => handleSubAreaChange(subArea)}
                    className={`flex items-center px-4 py-2 text-left hover:bg-green-100 ${
                      selectedSubArea === subArea ? 'bg-green-100' : ''
                    }`}
                  >
                    <span
                      className={`mr-3 inline-block h-4 w-4 rounded-full border-2 ${
                        selectedSubArea === subArea ? 'border-green-600 bg-green-600' : 'border-gray-400'
                      }`}
                    ></span>
                    {subArea}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default RegionSelector;
