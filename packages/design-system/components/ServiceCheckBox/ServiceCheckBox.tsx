import { useEffect, useState } from 'react';

import DropdownCheckBox from '../DropdownCheckBox/DropdownCheckBox';

interface ServiceCheckBoxProps {
  initialSelectedItems?: string[];
  onChange?: (_selectedItems: string[]) => void;
}

const ServiceCheckBox = ({ initialSelectedItems = [], onChange }: ServiceCheckBoxProps) => {
  const fixedService = 'S1';
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // 초기 selectedServices를 설정
  useEffect(() => {
    setSelectedServices(() => [...new Set([fixedService, ...initialSelectedItems])]);
  }, [initialSelectedItems]);

  const handleChange = (selectedItems: string[]) => {
    const updatedServices = [...new Set([fixedService, ...selectedItems])];
    setSelectedServices(updatedServices);

    if (onChange) {
      onChange(updatedServices);
    }
  };

  const serviceOptions = [
    { id: 'S1', label: '기본 서비스 (미용, 목욕)', subLabel: '기본' },
    { id: 'S2', label: '프리미엄 - 스파', subLabel: '스파' },
    { id: 'S3', label: '프리미엄 - 풀케어', subLabel: '풀케어' },
    { id: 'S4', label: '프리미엄 - 모니터링', subLabel: '모니터링' },
  ];

  return (
    <DropdownCheckBox
      selectedItems={selectedServices}
      options={serviceOptions}
      onChange={handleChange}
      placeholder='서비스 선택'
    />
  );
};

export default ServiceCheckBox;
