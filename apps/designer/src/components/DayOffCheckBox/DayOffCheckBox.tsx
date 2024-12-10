import { DropdownCheckBox } from '@daeng-ggu/design-system';

interface DayOffCheckBoxProps {
  // eslint-disable-next-line no-unused-vars
  onChange?: (selectedItems: string[]) => void;
}
const DayOffCheckBox = ({ onChange }: DayOffCheckBoxProps) => {
  const weekdayOptions = [
    { id: '월', label: '월' },
    { id: '화', label: '화' },
    { id: '수', label: '수' },
    { id: '목', label: '목' },
    { id: '금', label: '금' },
    { id: '토', label: '토' },
    { id: '일', label: '일' },
  ];
  return (
    <DropdownCheckBox options={weekdayOptions} onChange={onChange} placeholder='휴무 요일 선택'></DropdownCheckBox>
  );
};
export default DayOffCheckBox;
