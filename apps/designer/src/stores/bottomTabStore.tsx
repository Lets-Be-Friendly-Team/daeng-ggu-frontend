import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface BottomTabState {
  activePath: string;
  setActivePath: (_path: string) => void;
}

export const useDesignerBottomTabStore = create<BottomTabState>()(
  persist<BottomTabState>(
    (set) => ({
      activePath: '',
      setActivePath: (_path) => set({ activePath: _path }),
    }),
    {
      name: 'designerBottomTab',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
