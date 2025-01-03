import { MiniButton } from '@daeng-ggu/design-system';
import ReportDangIcon from '@daeng-ggu/design-system/components/Icons/ReportDangIcon.tsx';

interface EmptyStateProps {
  title?: string;
  buttonText?: string;
  onClick?: () => void;
}

const EmptyState = ({
  title = '타이틀 안적음!',
  buttonText = '버튼 텍스트 안적음!',
  onClick = () => {
    alert('함수도 안넣었니?');
  },
}: EmptyStateProps) => {
  return (
    <div className='flex justify-center'>
      <div className='mt-10 flex flex-col items-center gap-[1.2rem] px-6'>
        <ReportDangIcon />
        <div className='text-sub_h3 font-bold'>
          <p>{title}</p>
        </div>
        <div className='text-sub_h3'>
          <MiniButton text={buttonText} onClick={onClick} />
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
