import { ModalProps, useClickOutside } from '@daeng-ggu/shared';

import TypeTwoButton from '../TypeTwoButton/TypeTwoButton';

const Modal = ({ onConfirm, description, onClose, confirmText, cancelText, title }: ModalProps) => {
  const { targetRef } = useClickOutside<HTMLDivElement>(onClose);

  return (
    <>
      <div className='fixed z-40 flex h-[100vh] w-full min-w-[32rem] max-w-[48rem] flex-col items-center justify-center bg-black/20'>
        <section ref={targetRef} className='z-50 w-[80%] rounded-md bg-white px-[4rem] py-[2.4rem]'>
          <div className='flex w-full flex-col items-center justify-center gap-8'>
            <h3 className='text-sub_h2 font-semibold'>{title}</h3>
            <span className='w-[15rem] text-body3 text-gray-700'>{description}</span>
          </div>
          <div className='flex justify-center gap-[0.8rem]'>
            <TypeTwoButton
              className='h-[2.5rem] w-[8rem] rounded-md border-none bg-gray-50 text-gray-700'
              onClick={onClose}
              text={cancelText}
            />
            <TypeTwoButton
              className='h-[2.5rem] w-[8rem] rounded-md border-none'
              color='bg-primary'
              onClick={onConfirm}
              text={confirmText}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default Modal;