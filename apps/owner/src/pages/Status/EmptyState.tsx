import React from 'react';
import { MiniButton } from '@daeng-ggu/design-system';
import ReportDangIcon from '@daeng-ggu/design-system/components/Icons/ReportDangIcon.tsx';

interface EmptyStateProps {
  title?: string;
  buttonText?: string;
  onClick?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = '타이틀 안적음!',
  buttonText = '버튼 텍스트 안적음!',
  onClick = () => {
    alert('함수도 안넣었니?');
  },
}) => {
  return (
    <div className='flex justify-center'>
      <div className='mt-10 flex flex-col items-center px-6'>
        <ReportDangIcon />
        <div className='mt-3 text-sub_h3 font-bold'>
          <p>{title}</p>
        </div>
        <div className='mt-3 text-sub_h3'>
          <MiniButton text={buttonText} onClick={onClick} />
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
