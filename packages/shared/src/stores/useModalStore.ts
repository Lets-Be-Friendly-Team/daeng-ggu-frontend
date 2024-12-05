import { FC } from 'react';
import { ModalProps } from '@daeng-ggu/shared';
import { create } from 'zustand';

type PartialModalProps = Partial<ModalProps>;

interface ModalState {
  Component: FC<ModalProps> | null; // 모달로 사용할 컴포넌트
  props: PartialModalProps; // 모달에 전달할 props
  isOpen: boolean; // 모달 열림 여부
  show: (_Component: FC<ModalProps>, _props: PartialModalProps) => void; // 모달 열기
  close: () => void; // 모달 닫기
}

const useModalStore = create<ModalState>((set) => ({
  Component: null,
  props: {},
  isOpen: false,
  show: (Component, props = {}) =>
    set({
      Component,
      props,
      isOpen: true,
    }),
  close: () =>
    set({
      Component: null,
      props: {},
      isOpen: false,
    }),
}));

export default useModalStore;
