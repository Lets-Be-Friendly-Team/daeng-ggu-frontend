import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DesignerIdState {
  designerId: number | null;
  setDesignerId: (_designerId: number) => void;
}

const useDesignerIdStore = create(
  persist<DesignerIdState>(
    (set) => ({
      designerId: null,
      setDesignerId: (designerId: number | null) => set(() => ({ designerId: designerId })),
    }),
    { name: 'designerIdStorage' },
  ),
);

export default useDesignerIdStore;
