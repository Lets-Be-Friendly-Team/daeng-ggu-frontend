import { useClickOutside } from '@daeng-ggu/shared';

import { cn } from '../../lib/utils';
import { ModalProps } from '../../types/modal';
import TypeTwoButton from '../TypeTwoButton/TypeTwoButton';

const Modal = ({ onConfirm, description, onClose, confirmText, cancelText, title, btnCn }: ModalProps) => {
  const { targetRef } = useClickOutside<HTMLDivElement>(onClose);

  return (
    <>
      <div className='fixed z-[99999] flex h-[100vh] w-full min-w-[32rem] max-w-[48rem] flex-col items-center justify-center bg-black/20'>
        <section ref={targetRef} className='z-50 flex w-[80%] flex-col gap-8 rounded-md bg-white px-[4rem] py-[2.4rem]'>
          <div className='flex w-full flex-col items-center justify-center gap-8'>
            <h3 className='text-sub_h2 font-semibold'>{title}</h3>
            <span className='w-[16rem] break-keep text-center text-body3 leading-[2rem] text-gray-700'>
              {description}
            </span>
          </div>
          <div className='flex justify-center gap-[0.8rem]'>
            <TypeTwoButton
              className={cn('h-[2.5rem] w-[8rem] rounded-md border-none bg-gray-50 text-gray-700', btnCn)}
              onClick={onClose}
              text={cancelText}
            />
            <TypeTwoButton
              className={cn('h-[2.5rem] w-[8rem] rounded-md border-none', btnCn)}
              color='bg-primary'
              onClick={() => {
                onConfirm();
                onClose();
              }}
              text={confirmText}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default Modal;
