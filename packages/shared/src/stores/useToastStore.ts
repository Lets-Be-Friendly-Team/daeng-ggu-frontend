import { ToastType } from '@daeng-ggu/design-system';
import { create } from 'zustand';

interface toastState {
  toast: string | null;
  type: ToastType;
  // eslint-disable-next-line no-unused-vars
  showToast: ({ message, type }: { message: string; type?: ToastType }) => void;
  hideToast: () => void;
}

const useToastStore = create<toastState>((set) => ({
  toast: null,
  type: 'confirm',
  showToast: ({ message, type = 'confirm' }: { message: string; type?: ToastType }) => {
    set((state) => ({ ...state, toast: message, type: type }));
  },
  hideToast: () => {
    set((state) => ({ ...state, toast: null }));
  },
}));

export default useToastStore;
