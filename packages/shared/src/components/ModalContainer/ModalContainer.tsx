import { ModalProps } from 'src/types/modal';

import useModalStore from '../../stores/useModalStore';

const ModalContainer = () => {
  const { Component, props, isOpen, close } = useModalStore();
  const p = props as ModalProps;
  if (!isOpen || !Component) return null;

  return <Component {...p} onClose={close} />;
};

export default ModalContainer;