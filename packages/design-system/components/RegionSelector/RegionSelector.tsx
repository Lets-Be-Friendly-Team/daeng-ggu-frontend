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
          className={`flex h-[48px] w-full items-center justify-between rounded-md border border-primary px-4 py-2 text-left text-sub_h2 shadow-sm focus:outline-none focus:ring-1 focus:ring-primary ${
            isAreaOpen ? 'bg-secondary text-primary' : 'bg-white text-black'
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
          <ul className='absolute z-10 mt-2 max-h-60 w-full max-w-[440px] overflow-auto rounded-md border border-gray-300 bg-white text-sub_h2 shadow-lg scrollbar-hide'>
            {areas.map((area) => (
              <li key={area.name}>
                <button
                  type='button'
                  onClick={() => handleAreaChange(area.name)}
                  className={`flex w-full items-center px-4 py-2 text-left hover:bg-secondary ${
                    selectedArea === area.name ? 'bg-secondary' : ''
                  }`}
                >
                  <span className='relative mr-3 inline-block h-5 w-5 rounded-full border-2 border-primary'>
                    {selectedArea === area.name && (
                      <span className='absolute inset-0 m-auto h-2 w-2 rounded-full bg-primary'></span>
                    )}
                  </span>
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
            className={`flex h-[48px] w-full items-center justify-between rounded-md border border-primary px-4 py-2 text-left text-sub_h2 shadow-sm focus:outline-none focus:ring-1 focus:ring-primary ${
              isSubAreaOpen ? 'bg-secondary text-primary' : 'bg-white text-black'
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
            <ul className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-primary bg-white text-sub_h2 shadow-lg scrollbar-hide'>
              {subAreas.map((subArea) => (
                <li key={subArea}>
                  <button
                    type='button'
                    onClick={() => handleSubAreaChange(subArea)}
                    className={`flex w-full items-center px-4 py-2 text-left hover:bg-secondary ${
                      selectedSubArea === subArea ? 'bg-secondary' : ''
                    }`}
                  >
                    <span
                      className={`mr-3 inline-block h-4 w-4 rounded-full border-2 ${
                        selectedSubArea === subArea ? 'border-secondary bg-secondary' : 'border-gray-400'
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
