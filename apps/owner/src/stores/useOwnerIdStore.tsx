import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OwnerIdState {
  ownerId: number | null;
  setOwnerId: (_ownerId: number) => void;
}

const useOwnerIdStore = create(
  persist<OwnerIdState>(
    (set) => ({
      ownerId: null,
      setOwnerId: (ownerId: number | null) => set(() => ({ ownerId: ownerId })),
    }),
    { name: 'ownerIdStorage' },
  ),
);

export default useOwnerIdStore;
