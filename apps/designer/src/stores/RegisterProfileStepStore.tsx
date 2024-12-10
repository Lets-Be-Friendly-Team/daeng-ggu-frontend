import { create } from 'zustand';

interface StepStore {
  currentStep: number;
  direction: 'forward' | 'backward';
  nextStep: () => void;
  prevStep: () => void;
  resetStep: () => void;
  setDirection: (_dir: 'forward' | 'backward') => void;
}

export const useRegisterProfileStepStore = create<StepStore>((set) => ({
  currentStep: 1,
  direction: 'forward',
  setDirection: (_dir) => set(() => ({ direction: _dir })),
  nextStep: () => {
    set(() => ({ direction: 'forward' }));
    set((state) => ({ currentStep: state.currentStep + 1 }));
  },
  prevStep: () => {
    set(() => ({ direction: 'backward' }));
    set((state) => ({ currentStep: state.currentStep - 1 }));
  },
  resetStep: () => set(() => ({ currentStep: 1, direction: 'forward' })),
}));
