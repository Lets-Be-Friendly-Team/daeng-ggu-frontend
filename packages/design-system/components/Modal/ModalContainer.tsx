import { useModalStore } from '@daeng-ggu/shared';

import { ModalProps } from '../../types/modal';

type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

const ModalContainer = () => {
  const { Component, props, isOpen, close } = useModalStore();
  const p = props as WithOptional<ModalProps, 'onClose'>;
  const handleOnClose = () => {
    p?.onClose?.();
    close();
  };

  if (!isOpen || !Component) return null;

  return <Component {...p} onClose={handleOnClose} />;
};

export default ModalContainer;
