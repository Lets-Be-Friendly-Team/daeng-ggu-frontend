import { useModalStore } from '@daeng-ggu/shared';

import { ModalProps } from '../../types/modal';

const ModalContainer = () => {
  const { Component, props, isOpen, close } = useModalStore();
  const p = props as ModalProps;
  const handleOnClose = () => {
    p?.onClose();
    close();
  };

  if (!isOpen || !Component) return null;

  return <Component {...p} onClose={handleOnClose} />;
};

export default ModalContainer;
