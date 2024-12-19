// RequestContainer.tsx
import React from 'react';
import { Avatar, BorderContainer, Modal } from '@daeng-ggu/design-system';
import CloseIcon from '@daeng-ggu/design-system/components/Icons/CloseIcon.tsx';
import { useModalStore } from '@daeng-ggu/shared';

import useDeleteRequest from '@/hooks/queries/Request/useDeleteRequest';

interface RequestContainerProps {
  imageUrl: string;
  titleText?: string;
  mode?: string;
  children: React.ReactNode;
  onClick?: () => void;
  requestId: number;
}
/**
 * 프리티어 이슈로 프롬스 이상하게 보이니 걍 이해 빔
 * */
const RequestContainer = ({
  titleText = '',
  imageUrl,
  mode = '',
  children,
  onClick,
  requestId,
}: RequestContainerProps) => {
  const { mutate } = useDeleteRequest();
  const { show } = useModalStore();
  const handleDeleteRequest = (requestId: number) => {
    show(Modal, {
      title: '요청 삭제',
      description: '요청을 삭제하시겠습니까?',
      confirmText: '삭제',
      cancelText: '취소',
      onConfirm: () => {
        mutate(requestId);
      },
    });
  };
  return (
    <BorderContainer innerPadding='py-2'>
      <div className='relative'>
        <div className='ml-6 pt-4'>
          <p className='text-sub_h2 font-bold'>{titleText}</p>
        </div>
        {mode === 'request' && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteRequest(requestId);
            }}
            className='absolute right-4 top-4'
          >
            <CloseIcon className='h-6 w-6 cursor-pointer' />
          </button>
        )}
        <div className='mx-auto flex px-6 pb-4 pt-4' onClick={onClick}>
          <div className='flex items-center'>
            <Avatar imageUrl={imageUrl} mode='designerCard' containerClassName='h-[70px] w-[70px]' />
            <div className='ml-6'>{children}</div>
          </div>
        </div>
      </div>
    </BorderContainer>
  );
};

export default RequestContainer;
