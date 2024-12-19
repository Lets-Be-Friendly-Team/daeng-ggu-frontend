import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import areasData from '../../data/areas.json';

interface Area {
  name: string;
  subArea: string[];
}

interface RegionSelectorProps {
  onSelectionChange?: (_selection: { area: string; subArea: string }) => void;
}

const areas: Area[] = areasData;

const RegionSelector = ({ onSelectionChange }: RegionSelectorProps) => {
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
    <div className='mx-auto w-full space-y-6 py-4'>
      <div className='w-full' ref={areaRef}>
        <button
          type='button'
          onClick={() => setIsAreaOpen((prev) => !prev)}
          className={`flex h-[48px] w-full items-center justify-between rounded-md px-8 py-2 text-left text-sub_h3 text-gray-600 shadow ${
            isAreaOpen ? 'border-primary text-primary' : 'bg-white text-black'
          }`}
        >
          <span className={`${selectedArea ? 'text-primary' : ''}`}>{selectedArea || '지역을 선택해주세요'}</span>
          <svg
            className={`h-5 w-5 transition-transform duration-200 ${isAreaOpen ? 'rotate-180 transform' : ''} ${selectedArea ? 'text-primary' : ''}`}
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
          </svg>
        </button>

        {isAreaOpen && (
          <ul className='absolute z-10 mt-6 flex max-h-96 w-full max-w-[440px] flex-col gap-5 overflow-auto rounded-md text-sub_h3 text-gray-600 shadow scrollbar-hide'>
            {areas.map((area) => (
              <li key={area.name}>
                <button
                  type='button'
                  onClick={() => handleAreaChange(area.name)}
                  className={`flex w-full items-center px-8 py-4 text-gray-700 hover:text-primary ${
                    selectedArea === area.name ? 'text-primary' : ''
                  }`}
                >
                  {area.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedArea && (
        <div className='relative' ref={subAreaRef}>
          <button
            type='button'
            onClick={() => setIsSubAreaOpen((prev) => !prev)}
            className={`flex h-[48px] w-full items-center justify-between rounded-md px-8 py-2 text-left text-sub_h3 text-gray-700 shadow scrollbar-hide focus:outline-none focus:ring-1 focus:ring-primary ${
              isSubAreaOpen ? 'text-primary' : 'bg-white text-black'
            }`}
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
            <ul className='absolute z-10 mt-6 flex max-h-96 w-full flex-col gap-5 overflow-auto rounded-md py-2 text-sub_h3 text-gray-700 shadow-lg scrollbar-hide'>
              {subAreas.map((subArea) => (
                <li key={subArea}>
                  <button
                    type='button'
                    onClick={() => handleSubAreaChange(subArea)}
                    className={`flex w-full items-center px-8 py-4 hover:text-primary ${
                      selectedSubArea === subArea ? 'text-primary' : ''
                    }`}
                  >
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
