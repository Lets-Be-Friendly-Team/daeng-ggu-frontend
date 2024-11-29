import { create } from 'zustand';

interface BottomTabState {
  activePath: string;
  setActivePath: (_path: string) => void;
}

export const useOwnerBottomTabStore = create<BottomTabState>((set) => ({
  activePath: '',
  setActivePath: (_path) => set({ activePath: _path }),
}));
