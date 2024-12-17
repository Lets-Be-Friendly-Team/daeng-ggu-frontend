import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OwnerIdState {
  // ownerId: number | null;
  ownerId: number;
  setOwnerId: (_ownerId: number) => void;
}

const useOwnerIdStore = create(
  persist<OwnerIdState>(
    (set) => ({
      // ownerId: null,
      ownerId: -1,
      setOwnerId: (ownerId: number) => set(() => ({ ownerId: ownerId })),
      // setOwnerId: (ownerId: number | null) => set(() => ({ ownerId: ownerId })),
    }),
    { name: 'ownerIdStorage' },
  ),
);

export default useOwnerIdStore;
