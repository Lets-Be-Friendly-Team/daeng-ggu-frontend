import DropdownCheckBox from '../DropdownCheckBox/DropdownCheckBox';

interface ServiceCheckBoxProps {
  // eslint-disable-next-line no-unused-vars
  onChange?: (selectedItems: string[]) => void;
}
const ServiceCheckBox = ({ onChange }: ServiceCheckBoxProps) => {
  const serviceOptions = [
    { id: 'S1', label: '기본 서비스 (미용, 목욕)' },
    { id: 'S2', label: '프리미엄 - 스파' },
    { id: 'S3', label: '프리미엄 - 풀케어' },
    { id: 'S4', label: '프리미엄 - 모니터링' },
  ];
  return <DropdownCheckBox options={serviceOptions} onChange={onChange} placeholder='서비스 선택'></DropdownCheckBox>;
};
export default ServiceCheckBox;
