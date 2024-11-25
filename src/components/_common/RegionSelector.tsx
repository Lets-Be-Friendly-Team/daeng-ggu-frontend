import React, { useCallback, useMemo, useState } from 'react';

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

  const handleAreaChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedArea(e.target.value);
    setSelectedSubArea('');
  }, []);

  const handleSubAreaChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>): void => {
      const subArea = e.target.value;
      setSelectedSubArea(subArea);

      if (onSelectionChange && selectedArea && subArea) {
        onSelectionChange({ area: selectedArea, subArea });
      }
    },
    [onSelectionChange, selectedArea],
  );

  const subAreas = useMemo(() => {
    return areas.find((area) => area.name === selectedArea)?.subArea || [];
  }, [selectedArea]);

  return (
    <div>
      <select value={selectedArea} onChange={handleAreaChange}>
        <option value=''>지역을 선택해주세요</option>
        {areas.map((area) => (
          <option key={area.name} value={area.name}>
            {area.name}
          </option>
        ))}
      </select>

      {selectedArea && (
        <select value={selectedSubArea} onChange={handleSubAreaChange}>
          <option value=''>시,군,구를 선택해주세요</option>
          {subAreas.map((subArea) => (
            <option key={subArea} value={subArea}>
              {subArea}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default RegionSelector;
