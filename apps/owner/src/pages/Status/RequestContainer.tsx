// RequestContainer.tsx
import React from 'react';
import { Avatar, BorderContainer } from '@daeng-ggu/design-system';
import CloseIcon from '@daeng-ggu/design-system/components/Icons/CloseIcon.tsx';

interface RequestContainerProps {
  handleRequestDelete: () => void;
  imageUrl: string;
  titleText?: string;
  mode?: string;
  children: React.ReactNode;
  onClick?: () => void;
}
/**
 * 프리티어 이슈로 프롬스 이상하게 보이니 걍 이해 빔
 * */
const RequestContainer = ({ handleRequestDelete,   titleText = '',
                            imageUrl, mode = '', children, onClick }: RequestContainerProps) => {
  return (
    <BorderContainer>
      <div className='relative'>
        <div className='ml-6 pt-4'>
          <p className='text-sub_h2 font-bold'>{titleText}</p>
        </div>
        {mode === 'request' && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRequestDelete();
            }}
            className='absolute right-4 top-4'
          >
            <CloseIcon className='h-6 w-6 cursor-pointer' />
          </button>
        )}
        <div className='mx-auto flex pb-4 pl-8 pt-4' onClick={onClick}>
          <div className='flex'>
            <Avatar imageUrl={imageUrl} mode='requestView' />
            <div className='ml-4'>{children}</div>
          </div>
        </div>
      </div>
    </BorderContainer>
  );
};

export default RequestContainer;
