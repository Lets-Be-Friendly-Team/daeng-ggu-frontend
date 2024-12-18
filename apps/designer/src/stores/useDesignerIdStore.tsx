import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DesignerIdState {
  designerId: number;
  setDesignerId: (_designerId: number) => void;
}

const useDesignerIdStore = create(
  persist<DesignerIdState>(
    (set) => ({
      designerId: -1,
      setDesignerId: (designerId: number) => set(() => ({ designerId: designerId })),
    }),
    { name: 'designerIdStorage' },
  ),
);

export default useDesignerIdStore;
